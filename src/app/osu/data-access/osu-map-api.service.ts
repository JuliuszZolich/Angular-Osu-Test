import { inject, Injectable } from '@angular/core';
import { forkJoin, Observable, switchMap, tap } from 'rxjs';
import { map } from 'rxjs';
import { Score } from '../model/score';
import { OsuHttpClient } from './osu-httpclient.service';
import { Beatmap } from '../model/beatmap';
import { baseUrl } from './shared/access-urls';

@Injectable({
  providedIn: 'root',
})
export class OsuApiMapService {
  private httpClient = inject(OsuHttpClient);

  private beatmapCache = new Map<number, Beatmap>();

  getMapsForScores(scores: Score[]): Observable<Score[]> {
    console.log(this.beatmapCache)
    var scoresWithNewBeatMap = scores.filter(
      (score) => this.beatmapCache.get(score.beatmap_id) == undefined
    );
    var scoresWithoutNewBeatMap = scores.filter(
      (score) => this.beatmapCache.get(score.beatmap_id) != undefined
    );

    console.log("Cached maps: " + scoresWithoutNewBeatMap.length)
    console.log("Not cached maps: " + scoresWithNewBeatMap.length)
    const requests = this.getNewMaps(scoresWithNewBeatMap);
    const restOfScores = this.getMapsFromCache(scoresWithoutNewBeatMap);
    return forkJoin(requests).pipe(
      map((results) => [...(results.flat() as Score[]), ...restOfScores]),
      map((results) => results.sort((s1,s2)=>Date.parse(s2.ended_at)-Date.parse(s1.ended_at)))
    );
  }

  private parseIds(scores: Score[]) {
    var value = '';
    for (let i = 0; i < scores.length; i++) {
      value += '&ids[]=' + scores[i].beatmap_id;
    }
    return value;
  }

  private getNewMaps(scoresWithNewBeatMap: Score[]) {
    const chunks: Score[][] = [];

    //Api przyjmuje albo pojedyncze albo w chunkach do max 50
    //Aby zmniejszyć zużycie robiłem w chunkach
    for (let i = 0; i < scoresWithNewBeatMap.length; i += 50) {
      chunks.push(scoresWithNewBeatMap.slice(i, i + 50));
    }

    return chunks.map((chunk) =>
      this.httpClient
        .get<{ beatmaps: Beatmap[] }>(baseUrl + '/beatmaps?' + this.parseIds(chunk))
        .pipe(
          map((res) => res.beatmaps),
          map((maps) => {
            const beatmapMap = new Map(maps.map((beatmap) => [beatmap.id, beatmap]));

            return (
              chunk
                //Api czasami nie zwraca wszystkich map dlatego są filtrowane te z których nie ma danych
                .filter((score) => beatmapMap.has(score.beatmap_id))
                .map((score) => ({
                  ...score,
                  beatmap: beatmapMap.get(score.beatmap_id)!,
                }))
            );
          }),
          tap((scores)=>scores.forEach((score)=>this.beatmapCache.set(score.beatmap_id, score.beatmap)))
        )
    );
  }

  private getMapsFromCache(scoresWithoutNewBeatMap: Score[]) {
    scoresWithoutNewBeatMap.forEach((score)=>{
      score.beatmap = this.beatmapCache.get(score.beatmap_id);
    })
    return scoresWithoutNewBeatMap;
  };
}

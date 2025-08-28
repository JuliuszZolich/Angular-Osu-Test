import { inject, Injectable } from '@angular/core';
import { forkJoin, Observable, switchMap } from 'rxjs';
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

  getMapsForScore(scores: Score[]): Observable<Score[]> {
    const chunks: Score[][] = [];
    for (let i = 0; i < scores.length; i += 50) {
      chunks.push(scores.slice(i, i + 50));
    }

    const requests = chunks.map((chunk) =>
      this.httpClient
        .get<{ beatmaps: Beatmap[] }>(baseUrl + '/beatmaps?' + this.parseIds(chunk))
        .pipe(
          map((res) => res.beatmaps),
          map((maps) => {
            const beatmapMap = new Map(maps.map(beatmap => [beatmap.id, beatmap]));
            
            return chunk
              //Api czasami nie zwraca wszystkich map dlatego są filtrowane te z których nie ma danych
              .filter(score => beatmapMap.has(score.beatmap_id))
              .map(score => ({
                ...score,
                beatmap: beatmapMap.get(score.beatmap_id)!
              }));
          })
        )
    );

    return forkJoin(requests).pipe(map((results) => results.flat()));
  }

  private parseIds(scores: Score[]) {
    var value = '';
    for (let i = 0; i < scores.length; i++) {
      value += '&ids[]=' + scores[i].beatmap_id;
    }
    return value;
  }
}

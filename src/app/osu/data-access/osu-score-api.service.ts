import { inject, Injectable, OnInit } from '@angular/core';
import { Score } from '../model/score';
import { map, Observable, switchMap, tap } from 'rxjs';
import { OsuHttpClient } from './osu-httpclient.service';
import { baseUrl } from './shared/access-urls';

@Injectable({
  providedIn: 'root',
})
export class OsuScoreApiService {
  private httpClient = inject(OsuHttpClient);
  private cursorString = '';

  getScores(): Observable<Score[]> {
    return this.httpClient.get<{ scores: Score[], cursor_string: string }>(
      baseUrl + '/scores' + 
      (this.cursorString !== '' ? '?cursor_string=' + this.cursorString : '')
    ).pipe(
      tap((response) => this.cursorString = response.cursor_string),
      map((response) => response.scores)
    );
  }


}

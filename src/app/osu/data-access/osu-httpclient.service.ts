import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { tokenUrl } from './shared/access-urls';
import { bodyData } from './shared/environment';

type AccessData = {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token?: string;
};



@Injectable({
  providedIn: 'root',
})
export class OsuHttpClient {

  private httpClient = inject(HttpClient);
  private token?: string = undefined;

  private getToken(): Observable<string> {
    if (this.token) return of(this.token);

    return this.httpClient
      .post<AccessData>(tokenUrl, bodyData, {
        headers: this.getTokenHeaders(),
      })
      .pipe(
        tap((response) => {
          this.token = response.access_token;
        }),
        map((response) => response.access_token)
      );
  }

  get<T>(url: string): Observable<T> {
    return this.getToken().pipe(
      switchMap((token) => this.httpClient.get<T>(url, { headers: this.getJsonHeaders(token) }))
    );
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.getToken().pipe(
      switchMap((token) =>
        this.httpClient.post<T>(url, body, { headers: this.getJsonHeaders(token) })
      )
    );
  }

  private getJsonHeaders(token: string) {
    return {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  private getTokenHeaders() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }
}

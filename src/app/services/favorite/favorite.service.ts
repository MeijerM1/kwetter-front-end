import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticatorService} from '../authentication/authenticator.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private baseUrl = 'https://us-central1-jea-max-meijer.cloudfunctions.net';
  public favorites: string[] = null;

  constructor(private http: HttpClient) {
  }

  public addFavorite(userId: string, tweetId: string) {
    const body = {
      user: userId,
      tweet: tweetId
    };

    return this.http.post(this.baseUrl + '/addFavorite', body);
  }

  public getFavorites(user: string): Observable<string[]> {
    const param = new HttpParams().set('user', user);
    return this.http.get<string[]>(this.baseUrl + '/favorites', { params: param });
  }

  public removeFavorite(userId: string, tweetId: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        user: userId,
        tweet: tweetId
      },
    };

    return this.http.delete(this.baseUrl + '/removeFavorite', options);
  }

  public isFavorite(tweet: string): boolean {
    if (!this.favorites) {
      return false;
    }

    return this.favorites.indexOf(tweet) !== -1;
  }
}

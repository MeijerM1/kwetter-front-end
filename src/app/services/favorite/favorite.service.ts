import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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

  public isFavorite(tweet: string): boolean {
    return this.favorites.indexOf(tweet) !== -1;
  }
}

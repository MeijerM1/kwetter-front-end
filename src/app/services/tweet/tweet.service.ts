import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Tweet } from 'src/app/domain/Tweet';
import { Response } from '../../domain/Response';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  private baseUrl = environment.API_BASE + '/tweet';

  constructor(private http: HttpClient) { }

  public search(query: string) {
    const params = new HttpParams().set('q', query)
    return this.http.get<any>(this.baseUrl + '/search', {params});
  }

  public getByUser(uuid: string) {
    return this.http.get<Response>(`${this.baseUrl}/${uuid}/tweets`);
  }

  public postTweet(tweet: Tweet) {
    return this.http.post(this.baseUrl, tweet);
  }
}

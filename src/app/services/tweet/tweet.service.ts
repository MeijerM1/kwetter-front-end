import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Tweet } from 'src/app/domain/Tweet';
import { Response } from '../../domain/Response';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  private baseUrl = 'http://localhost:8080/api/tweet';
  private searchUrl = 'http://localhost:8080/api/tweet/search'

  constructor(private http: HttpClient) { }

  public search(query: string) {
    const params = new HttpParams().set('q', query)
    return this.http.get<any>(this.searchUrl, {params: params});
  }

  public getByUser(uuid: string) {
    return this.http.get<Response>(`${this.baseUrl}/${uuid}/tweets`);
  }
}

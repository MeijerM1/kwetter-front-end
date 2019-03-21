import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Tweet } from 'src/app/domain/Tweet';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  private searchUrl = 'http://localhost:8080/api/tweet/search'

  constructor(private http: HttpClient) { }

  public search(query: string) {
    const params = new HttpParams().set('q', query)
    return this.http.get<any>(this.searchUrl, {params: params})  }
}

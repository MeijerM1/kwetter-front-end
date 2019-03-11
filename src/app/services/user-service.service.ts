import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseUrl: string = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) { }

  public getAllUsers() {
    return this.http.get<any>(this.baseUrl)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UserDto} from '../../domain/UserDto';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) { }

  public getAllUsers() {
    return this.http.get<any>(this.baseUrl);
  }

  public register(user: UserDto) {
    return this.http.post(this.baseUrl, user);
  }

}

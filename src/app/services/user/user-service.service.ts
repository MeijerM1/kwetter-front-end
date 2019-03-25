import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDto } from '../../domain/UserDto';
import { Response} from '../../domain/Response';

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

  public update(user: UserDto) {
    return this.http.put(`${this.baseUrl}/${user.uuid}`, user);
  }

  public getFollowers(id: string) {
    return this.http.get<Response>(`${this.baseUrl}/${id}/followers`);
  }

  public getFollowing(id: string) {
    return this.http.get<Response>(`${this.baseUrl}/${id}/following`);
  }

  public getById(id: string) {
    return this.http.get<Response>(`${this.baseUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import {UserDto} from '../../domain/UserDto';
import {HttpClient} from '@angular/common/http';
import { Response } from '../../domain/Response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  private loginUrl = 'http://localhost:8080/api/user/login';
  public currentUser: UserDto;

  constructor(private http: HttpClient) { }

  public login(username: string, password: string) {
    // @ts-ignore
    const user: UserDto = new UserDto(username, password);

    return this.http.post<Response>(this.loginUrl, user);
  }

  public isCurrentUser(id: string) {
    if (!this.currentUser) {
      return false;
    } else {
      return this.currentUser.uuid === id;
    }
  }

  public isAuthenticated(): boolean {
    if (!localStorage.getItem('currentUser')) {
      return false;
    } else {
      return true;
    }
  }

  public setCurrenUser(user: UserDto) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser = user;
  }

  public getCurrentUser(): UserDto {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  public logout() {
    localStorage.removeItem('currentUser');
    this.currentUser = undefined;
  }
}

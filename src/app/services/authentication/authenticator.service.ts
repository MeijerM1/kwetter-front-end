import { Injectable } from '@angular/core';
import {User} from '../../domain/User';
import {HttpClient} from '@angular/common/http';
import { Response } from '../../domain/Response';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  private loginUrl = environment.API_BASE + '/users/login';
  public currentUser: User;

  constructor(private http: HttpClient) { }

  public login(username: string, password: string) {
    // @ts-ignore
    const user: User = new User();
    user.username = username;
    user.password = password;

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
    const user = localStorage.getItem('currentUser');
    return user !== null;
  }

  public setCurrenUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser = user;
  }

  public getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  public logout() {
    localStorage.removeItem('currentUser');
    this.currentUser = undefined;
  }

  public getAuthToken(): string {
    return this.currentUser.token;
  }
}

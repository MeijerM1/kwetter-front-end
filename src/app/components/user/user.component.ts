import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import {User} from '../../domain/User';
import {AuthenticatorService} from '../../services/authentication/authenticator.service';
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  private users: User[];
  private searchQuery = 'user';

  constructor(private userService: UserServiceService,
              private authService: AuthenticatorService,
              private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.search();
  }

  followUser(id: string) {
    this.authService.currentUser.following.push(id);
    this.userService.update(this.authService.currentUser).subscribe((response: User) => {
      this.authService.setCurrenUser(response);
      this.snackbar.open('Success', 'dismiss', {
        duration: 2000
      });
    });
  }

  unfollowUser(id: string) {
    this.authService.currentUser.following.splice(this.authService.currentUser.following.indexOf(id), 1);
    this.userService.update(this.authService.currentUser).subscribe((response: User) => {
      this.authService.setCurrenUser(response);
      this.snackbar.open('Success', 'dismiss', {
        duration: 2000
      });
    });
  }

  public search() {
    if (this.searchQuery === '') {
      this.users = [];
      return;
    }

    this.userService.search(this.searchQuery).subscribe((response) => {
      this.users = response.payload;
      this.users = this.users.filter((user) => this.notCUrrentUser(user));
    });
  }

  private notCUrrentUser(value) {
    return value.uuid !== this.authService.currentUser.uuid;
  }

}

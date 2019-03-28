import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import {UserDto} from '../../domain/UserDto';
import {AuthenticatorService} from '../../services/authentication/authenticator.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  private users: UserDto[];
  private searchQuery: string;

  constructor(private userService: UserServiceService, private authService: AuthenticatorService) { }

  ngOnInit() {
  }

  followUser(id: string) {
    this.authService.currentUser.following.push(id);
    this.userService.update(this.authService.currentUser).subscribe();
  }

  public search() {
    if (this.searchQuery === '') {
      this.users = [];
      return;
    }

    this.userService.search(this.searchQuery).subscribe((response) => {
      this.users = response.payload;
    });
  }

}

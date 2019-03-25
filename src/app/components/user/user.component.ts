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

  constructor(private userService: UserServiceService, private authService: AuthenticatorService) { }

  ngOnInit() {
    this.userService.getAllUsers()
    .subscribe((response: any) => {
      this.users = response.payload;
    });
  }

  followUser(id: string) {
    this.authService.currentUser.following.push(id);
    this.userService.update(this.authService.currentUser).subscribe();
  }
}

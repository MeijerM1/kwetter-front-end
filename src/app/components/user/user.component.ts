import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import {UserDto} from '../../domain/UserDto';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  private users: UserDto[];

  constructor(private userService: UserServiceService) { }

  ngOnInit() {
    this.userService.getAllUsers()
    .subscribe((response: any) => {
      this.users = response.payload;
    });
  }
}

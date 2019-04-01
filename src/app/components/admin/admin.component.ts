import { Component, OnInit } from '@angular/core';
import { User } from '../../domain/User';
import { UserServiceService } from '../../services/user/user-service.service';
import {Role} from "../../domain/Role";
import {RoleService} from "../../services/role/role.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  private searchQuery: string = 'user';
  private users: User[] = [];
  private roles: Role[] = [];

  constructor(private userService: UserServiceService,
              private roleService: RoleService,
              private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.search();
    this.getRoles();
  }

  getRoles() {
    this.roleService.getAll().subscribe((response) => {
      this.roles = response.payload;
    });
  }

  search() {
    this.userService.search(this.searchQuery).subscribe((response) => {
      this.users = response.payload;
    });
  }

  delete(uuid: string) {
    // Delete the user
  }

  update(uuid: string) {
    let user = this.users.find(u => u.uuid === uuid);
    console.log(user);
    this.userService.update(user).subscribe(() => {
      this.snackbar.open('User updated', 'dismiss', {
        duration: 2000
      });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import {User} from '../../domain/User';
import {UserServiceService} from '../../services/user/user-service.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User = new User();

  constructor(private userService: UserServiceService, private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  showErrorSnackbar() {
    this.snackbar.open('An error has occurred', 'dismiss', {
      duration: 3000
    });
  }

  register() {
    this.userService.register(this.user)
      .subscribe((response) => {
        this.router.navigateByUrl('/');
      }, error => this.showErrorSnackbar());
  }
}

import {Component, OnInit} from '@angular/core';
import {UserDto} from '../../domain/UserDto';
import {AuthenticatorService} from '../../services/authentication/authenticator.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: UserDto = new UserDto();

  constructor(private authService: AuthenticatorService, private snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit() {
  }

  showErrorSnackBar() {
    this.snackBar.open('Invalid username or password', 'dismiss', {
      duration: 5000
    });
  }

  login() {
    this.authService.login(this.user.username, this.user.password).subscribe(
      (response) => {
        const user: UserDto = response.payload;
        this.authService.setCurrenUser(user);
        this.router.navigateByUrl('/');
      },
        error => this.showErrorSnackBar());
  }
}

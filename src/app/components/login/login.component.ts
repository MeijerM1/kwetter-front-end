import {Component, OnInit} from '@angular/core';
import {User} from '../../domain/User';
import {AuthenticatorService} from '../../services/authentication/authenticator.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private user: User = new User();

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
    console.log(this.user);
    this.authService.login(this.user.username, this.user.password).subscribe(
      (response) => {
        const user: User = response.payload;
        console.log(user);
        this.authService.setCurrenUser(user);
        this.router.navigateByUrl('/');
      },
        error => this.showErrorSnackBar());
  }
}

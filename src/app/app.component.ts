import {Component, OnInit} from '@angular/core';
import {AuthenticatorService} from './services/authentication/authenticator.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'kwetter';

  constructor(private authService: AuthenticatorService, private router: Router) {}

  ngOnInit() {
    if(this.authService.isAuthenticated()) {
      this.authService.setCurrenUser(this.authService.getCurrentUser());
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
    window.location.reload();
  }

  viewProfile() {

  }

}

import {Component, OnInit} from '@angular/core';
import {AuthenticatorService} from './services/authentication/authenticator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'kwetter';

  constructor(private authService: AuthenticatorService) {}

  ngOnInit() {
    if(this.authService.isAuthenticated()) {
      this.authService.setCurrenUser(this.authService.getCUrrentUser());
    }
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }

}

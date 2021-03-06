import {Component, OnInit} from '@angular/core';
import {AuthenticatorService} from './services/authentication/authenticator.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {TweetComponent} from './components/tweet/tweet.component';
import {RoleService} from './services/role/role.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'kwetter';

  constructor(private authService: AuthenticatorService,
              private router: Router,
              private dialog: MatDialog,
              private roleService: RoleService) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.authService.setCurrenUser(this.authService.getCurrentUser());
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
    window.location.reload();
  }

  postTweet() {
    const dialogRef = this.dialog.open(TweetComponent);
  }

  checkRole(): Observable<boolean> {
    if (!this.authService.isAuthenticated()) {
      return Observable.create(false);
    }

    this.roleService.checkRole(this.authService.currentUser.roleUuid, 'ADMIN');
  }
}

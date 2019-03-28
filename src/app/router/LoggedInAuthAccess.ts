import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticatorService} from '../services/authentication/authenticator.service';

@Injectable()
export class LoggedInAuthAccess implements CanActivate {
  constructor(
    // declare variables
    private authService: AuthenticatorService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    this.router.navigateByUrl('/unauthorised');
    return false;
  }
}

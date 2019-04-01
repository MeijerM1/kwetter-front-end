import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticatorService} from '../services/authentication/authenticator.service';
import {RoleService} from '../services/role/role.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    // declare variables
    private authService: AuthenticatorService,
    private router: Router,
    public roleService: RoleService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isAuthenticated()) {
      return false;
    }

    const expectedRole = route.data.expectedRole;

    return this.roleService.checkRole(this.authService.currentUser.roleUuid, expectedRole);

  }
}

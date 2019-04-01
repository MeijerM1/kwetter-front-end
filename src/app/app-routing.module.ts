import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ProfileComponent} from './components/profile/profile.component';
import {LoggedInAuthAccess} from './router/LoggedInAuthAccess';
import {UnauthComponent} from './components/unauth/unauth.component';
import {AdminComponent} from "./components/admin/admin.component";
import {RoleGuard} from "./router/RoleAuthAccess";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'unauthorised',
    component: UnauthComponent
  },
  {
    path: 'users',
    component: UserComponent,
    canActivate: [LoggedInAuthAccess]
  },
  {
    path: 'search/:query',
    component: SearchComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [LoggedInAuthAccess]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'ADMIN'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatListModule,
    MatToolbarModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
    MatTabsModule,
    MatDialogModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSelectModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import {LoggedInAuthAccess} from './router/LoggedInAuthAccess';
import { UnauthComponent } from './components/unauth/unauth.component';
import { TweetComponent } from './components/tweet/tweet.component';
import { AdminComponent } from './components/admin/admin.component';
import {RoleGuard} from './router/RoleAuthAccess';
import {httpInterceptorProviders} from './http-interceptors';
import {InjectableRxStompConfig, RxStompService, rxStompServiceFactory} from '@stomp/ng2-stompjs';
import {myRxStompConfig} from './rx-stomp-config';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    SearchComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    TweetComponent,
    UnauthComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatListModule,
    MatToolbarModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
    MatTabsModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [TweetComponent],
  providers: [
    LoggedInAuthAccess,
    RoleGuard,
    httpInterceptorProviders,
    {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

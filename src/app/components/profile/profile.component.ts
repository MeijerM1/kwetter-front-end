import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../domain/User';
import {AuthenticatorService} from '../../services/authentication/authenticator.service';
import {UserServiceService} from '../../services/user/user-service.service';
import {Tweet} from '../../domain/Tweet';
import {TweetService} from '../../services/tweet/tweet.service';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from "@angular/material";
import {FavoriteService} from "../../services/favorite/favorite.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  followers: User[];
  following: User[];
  tweets: Tweet[];
  private selectedTab: number;

  constructor(private activeRoute: ActivatedRoute,
              private authService: AuthenticatorService,
              private userService: UserServiceService,
              private tweetService: TweetService,
              private favoriteService: FavoriteService,
              private snackbar: MatSnackBar) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      const id = params['id'];
      this.userService.getById(id).subscribe((response) => {
        this.user = response.payload;

        this.userService.getFollowers(this.user.uuid).subscribe((followers) => {
          console.log(followers);
          this.followers = followers.payload;
        });

        this.userService.getFollowing(this.user.uuid).subscribe((following) => {
          console.log(following);
          this.following = following.payload;
        });

        this.tweetService.getByUser(this.user.uuid).subscribe((tweets) => {
          console.log(tweets);
          this.tweets = tweets.payload;
        });

        this.selectedTab = 0;
      });

    });
  }

  updateProfile() {
    this.userService.update(this.user).subscribe((response) => {
      console.log(response);
      this.snackbar.open('Profile updated!', 'dismiss', {
        duration: 2000
      });
    });
  }
}

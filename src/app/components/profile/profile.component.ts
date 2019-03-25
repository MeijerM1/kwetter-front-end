import {Component, Input, OnInit} from '@angular/core';
import {UserDto} from '../../domain/UserDto';
import {AuthenticatorService} from '../../services/authentication/authenticator.service';
import {UserServiceService} from '../../services/user/user-service.service';
import {Tweet} from '../../domain/Tweet';
import {TweetService} from '../../services/tweet/tweet.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: UserDto;
  followers: UserDto[];
  following: UserDto[];
  tweets: Tweet[];

  constructor(private activeRoute: ActivatedRoute,
              private authService: AuthenticatorService,
              private userService: UserServiceService,
              private tweetService: TweetService) {
  }

  ngOnInit() {
    const id = this.activeRoute.snapshot.paramMap.get('id');
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

    });

    // this.user = this.authService.getCurrentUser();

  }

  updateProfile() {
    this.userService.update(this.user).subscribe((response) => {
      console.log(response);
    });
  }
}

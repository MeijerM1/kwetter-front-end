import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TweetService} from '../../services/tweet/tweet.service';
import {AuthenticatorService} from '../../services/authentication/authenticator.service';
import {Tweet} from '../../domain/Tweet';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private searchQuery: string;
  private tweets: Tweet[] = [];
  private tweetTimer;

  constructor(private router: Router,
              private tweetService: TweetService,
              private authService: AuthenticatorService) {
    if (this.authService.isAuthenticated()) {
      this.getTweets();
/*
      this.tweetTimer = setInterval(() => {
        this.getTweets();
      }, 10000);
*/
    }
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    if (this.tweetTimer) {
      clearInterval(this.tweetTimer);
    }
  }

  private getTweets() {
    this.tweetService.getUserTimeline(this.authService.getCurrentUser().uuid).subscribe((response) => {
      console.log(response.payload);
      this.tweets = response.payload;
    });
  }

  public search() {
    this.router.navigateByUrl('/search/' + this.searchQuery);
  }
}

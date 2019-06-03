import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TweetService} from '../../services/tweet/tweet.service';
import {AuthenticatorService} from '../../services/authentication/authenticator.service';
import {Tweet} from '../../domain/Tweet';
import {WebsocketService} from '../../services/websocket/websocket.service';
import {RxStompService, StompHeaders} from '@stomp/ng2-stompjs';

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
              private authService: AuthenticatorService,
              private socket: WebsocketService,
              private rxStompService: RxStompService) {
    if (this.authService.isAuthenticated()) {
      this.getTweets();

      this.rxStompService.watch(`/user/queue/test`)
        .subscribe((message: any) => {
          console.log(message);
        });

      // this.rxStompService.stompClient.subscribe('/user/queue/tweets', (message) => {
      //   console.log(message);
      // });

      this.rxStompService.publish({destination: '/app/tweets', body: this.authService.getCurrentUser().uuid});


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

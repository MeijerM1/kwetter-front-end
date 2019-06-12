import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TweetService} from '../../services/tweet/tweet.service';
import {AuthenticatorService} from '../../services/authentication/authenticator.service';
import {Tweet} from '../../domain/Tweet';
import {Stomp} from '@stomp/stompjs';
import {FavoriteService} from '../../services/favorite/favorite.service';

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
              private favoriteService: FavoriteService) {
    if (this.authService.isAuthenticated()) {
      this.getTweets();

      // @ts-ignore
      const sock = new SockJS('http://localhost:8080/tweets');
      const stompClient = Stomp.over(sock);

      let sessionId = '';
      const user = this.authService.getCurrentUser().uuid;

      stompClient.connect({}, (frame) => {
        let url = stompClient.ws._transport.url;
        url = url.replace(
          'ws://localhost:8080/tweets',  '');
        url = url.replace('/websocket', '');
        url = url.replace(/^[0-9]+\//, '');
        url = url.substring(url.indexOf('/', 2));
        console.log('Session: ' + url);
        sessionId = url;

        stompClient.subscribe(`/user${sessionId}/queue/tweets`, (data) => {
          console.log(data);
          const tweet = JSON.parse(data.body);
          this.tweets.unshift(tweet);
        }, { testHeader: sessionId});

        stompClient.send('/app/tweets', {}, user);
      });


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
    this.favoriteService.getFavorites(this.authService.getCurrentUser().uuid).subscribe((response) => {
      console.log(response);
      if (response === null) {
        this.favoriteService.favorites = [];
      } else {
        this.favoriteService.favorites = response;
      }

    });

    this.tweetService.getUserTimeline(this.authService.getCurrentUser().uuid).subscribe((response) => {
      console.log(response.payload);
      this.tweets = response.payload;
    });
  }

  public search() {
    this.router.navigateByUrl('/search/' + this.searchQuery);
  }

  addFavorite(tweetId: string) {
    this.favoriteService.addFavorite(this.authService.currentUser.uuid, tweetId).subscribe((response) => {
      this.favoriteService.favorites.push(tweetId);
    }, err => console.log(err));
  }

  removeFavorite(tweetId: string) {
    this.favoriteService.removeFavorite(this.authService.currentUser.uuid, tweetId).subscribe((response) => {
      this.favoriteService.favorites.splice(this.favoriteService.favorites.indexOf(tweetId), 1);
    }, err => console.log(err));
  }

  changeFavorite(tweetId: string) {
    if (this.favoriteService.isFavorite(tweetId)) {
      this.removeFavorite(tweetId);
    } else {
      this.addFavorite(tweetId);
    }
  }
}

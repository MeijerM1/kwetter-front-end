import {Component, Inject, OnInit} from '@angular/core';
import {Tweet} from "../../domain/Tweet";
import {TweetService} from "../../services/tweet/tweet.service";
import {AuthenticatorService} from "../../services/authentication/authenticator.service";
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import {WebsocketService} from '../../services/websocket/websocket.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.sass']
})
export class TweetComponent  {

  tweet: Tweet = new Tweet();

  constructor(public dialogRef: MatDialogRef<TweetComponent>,
              private tweetService: TweetService,
              private authService: AuthenticatorService,
              private snackbar: MatSnackBar ) {
    this.tweet.authorUuid = this.authService.currentUser.uuid;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  postTweet() {
    console.log(this.tweet);
    this.tweetService.postTweet(this.tweet).subscribe(() => {
      this.snackbar.open('Tweet posted!', 'dismiss', {
        duration: 2000
      });
      this.dialogRef.close();
    });
  }
}

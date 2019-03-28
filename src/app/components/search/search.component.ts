import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TweetService } from 'src/app/services/tweet/tweet.service';
import { Tweet } from 'src/app/domain/Tweet';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  private searchQuery: string;
  tweets: Tweet[];

  constructor(private route: ActivatedRoute, private tweetService: TweetService) { }

  ngOnInit() {
    this.searchQuery = this.route.snapshot.paramMap.get('query');
    console.log(this.searchQuery);

    this.search();
  }

  public search() {
    if (this.searchQuery === '') {
      this.tweets = [];
      return;
    }
    console.log('searching');
    console.log(this.searchQuery)

    this.tweetService.search(this.searchQuery).subscribe((response) => {
      console.log(response)
      this.tweets = response.payload;
    });
  }

}

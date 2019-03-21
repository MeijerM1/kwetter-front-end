import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private searchQuery: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public search() {
    this.router.navigateByUrl('/search/' + this.searchQuery);
  }
}

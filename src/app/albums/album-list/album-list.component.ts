import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  WpApiPosts
} from 'wp-api-angular'
import { Router } from '@angular/router';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit {

  public albums$: Observable<any>;

  constructor(
    private wpApiPosts: WpApiPosts,
    private router: Router
    ) {

    this.albums$ = wpApiPosts.getList({search: 'categories=2'})
      .map(response => response.json())

  }

  ngOnInit() {

  }

  public selectAlbum(slug){
      this.router.navigate([slug]);
  }

}

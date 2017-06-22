import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WpApiPosts, WpApiMedia } from 'wp-api-angular'
import { Album } from '../album';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-album-single',
  templateUrl: './album-single.component.html',
  styleUrls: ['./album-single.component.scss']
})
export class AlbumSingleComponent implements OnInit {

  public album$: Observable<Album>;
  public error: any;

  constructor( private wpApiPosts: WpApiPosts, private route: ActivatedRoute ) { }

  getAlbum(slug){
    this.wpApiPosts.getList({search: 'slug='+slug})
      .map(response => { console.log(response.json()) })
    
    // this.wpApiPosts.getList({search: 'slug='+slug})
    //   .toPromise()
    //   .then(response => response.json())
    //   .then(body => { this.album$ = body[0] })
    //   .catch(error => { this.error = error; })
  }

  ngOnInit() {

    this.route.params.forEach((params: Params) => {
       let slug = params['slug'];
       this.getAlbum(slug)
    });

  }

}

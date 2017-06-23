import { Component, OnInit } from '@angular/core';
import { Song } from '../../models/song';
import { AlbumService } from '../../services/album.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss'],
  providers: [AlbumService]
})
export class SongComponent implements OnInit {
  song: Song;
  error: any;

  constructor( private albumService: AlbumService, private route: ActivatedRoute ) { }

  public getSong(slug){
    this.albumService
      .getSong(slug)
      .subscribe( (res) => {
        // success
        this.song = res[0];
      }, (err) => {
        // error
        this.error = err;
      });
  }

  ngOnInit() {

    this.route.params.forEach((params: Params) => {
       let slug = params['slug'];
       this.getSong(slug)
    });

  }

}


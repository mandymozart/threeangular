import { Component, OnInit, Input, NgZone, HostListener } from '@angular/core';
import { Album, AlbumMeta } from '../../models/album';
import { AlbumService } from '../../services/album.service';
import { Router } from '@angular/router';

class ScrollerData {
  project: {}
  images: {}
}

@Component({
  selector: 'app-album-single',
  templateUrl: './album-single.component.html',
  styleUrls: ['./album-single.component.scss'],
  providers: [AlbumService]
})
export class AlbumSingleComponent implements OnInit {

  public album: Album;
  public error: string;

  public data: ScrollerData; 

  @Input()
  public categoryId: number

  @HostListener('window:scroll', [])
  onWindowScroll() {
    console.log('windowscrolltrigger')
  }

  @HostListener('window:resize', [])
  onWindowResize(){
    console.log('windowResizedtrigger')
  }

  constructor( 
    private albumService: AlbumService, 
    private router: Router, 
    private _ngZone: NgZone 
    ) { }

  getAlbum(){
    this.albumService
      .getAlbum(this.categoryId)
      .subscribe(res => {
        // success (do data mapping here)
        console.log(res)
        this.album = res;
        // Made Component available to scroller AppOutside of angular
        window['AlbumComponent'] = { component: this, zone: this._ngZone, album: this.album }
        window.dispatchEvent( new Event('album:loaded') );
      }, err => {
        // error
        this.error = err;
      });
  }

  ngOnInit() {
    this.getAlbum();
  }
 
  selectSong(slug) {
  	this.router.navigate([slug]);
  }

  showMeta() {
    this.router.navigate(['womensloveandlife']);
  }

}

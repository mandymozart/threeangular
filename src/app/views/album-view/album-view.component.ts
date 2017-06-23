import { Component, OnInit, HostBinding } from '@angular/core';
import { AlbumSingleComponent } from './../../components/album-single/album-single.component';
import { slideInDownAnimation } from './../../app.animations'

@Component({
  selector: 'app-album-view',
  templateUrl: './album-view.component.html',
  styleUrls: ['./album-view.component.scss'],
  animations: [ slideInDownAnimation ]
})
export class AlbumViewComponent implements OnInit {

  constructor() { }

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  ngOnInit() {
  }

}

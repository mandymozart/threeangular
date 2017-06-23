import { Component, OnInit, HostBinding } from '@angular/core';
import { PostSingleComponent } from './../../components/post-single/post-single.component'
import { slideInDownAnimation } from './../../app.animations'

@Component({
  selector: 'app-info-view',
  templateUrl: './info-view.component.html',
  styleUrls: ['./info-view.component.scss'],
  animations: [ slideInDownAnimation ]
})
export class InfoViewComponent implements OnInit {

  constructor() { }

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  ngOnInit() {
  }

}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// TODO: Refactor routes to views
import { InfoViewComponent } from './views/info-view/info-view.component';
import { AlbumViewComponent } from './views/album-view/album-view.component';
import { SongViewComponent } from './views/song-view/song-view.component';

const routes: Routes = [
  {
    path: '',
    component: AlbumViewComponent
  },
  {
    path: ':slug',
    component: InfoViewComponent
  },
  {
    path: 'womensloveandlife/:slug',
    component: SongViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class Wpng2RoutingModule { }

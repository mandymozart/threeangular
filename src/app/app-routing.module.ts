import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostSingleComponent } from './posts/post-single/post-single.component';
import { AlbumListComponent } from './albums/album-list/album-list.component';
import { AlbumSingleComponent } from './albums/album-single/album-single.component';

const routes: Routes = [
  {
    path: 'posts',
    component: PostListComponent,
    pathMatch: 'full'
  },
  {
    path: 'posts/:slug',
    component: PostSingleComponent
  },
  {
    path: '',
    component: AlbumListComponent
  },
  {
    path: ':slug',
    component: AlbumSingleComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class Wpng2RoutingModule { }

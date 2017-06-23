import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { AppComponent } from './app.component';
import { Wpng2RoutingModule } from './app-routing.module';

import { PostSingleComponent } from './components/post-single/post-single.component';
import { AlbumSingleComponent } from './components/album-single/album-single.component';
import { SongComponent } from './components/song/song.component';

import { AlbumViewComponent } from './views/album-view/album-view.component';
import { InfoViewComponent } from './views/info-view/info-view.component';
import { SongViewComponent } from './views/song-view/song-view.component';

@NgModule({
  declarations: [
    AppComponent,
    PostSingleComponent,
    AlbumSingleComponent,
    SongComponent,
    AlbumViewComponent,
    InfoViewComponent,
    SongViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Wpng2RoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

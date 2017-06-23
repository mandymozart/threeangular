import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Song } from './../models/song';
import { Album, AlbumMeta } from './../models/album';

import { environment } from '../../environments/environment';

@Injectable()
export class AlbumService {

  private _wpBase = environment.wpBase;

  constructor(private http: Http) { }

  public getAlbums(): Observable<Album[]> {

    return this.http
      .get(this._wpBase + 'posts?tags='+environment.wpTagIds.album+'&order=desc&orderby=date')
      .map((res: Response) => res.json())
      .catch((err: Response | any) => {
        console.error(err)
        return Observable.throw(err);
      });

  }

  public getAlbum(catId): Observable<Song[]> {

    return this.http
      .get(this._wpBase + 'posts?categories='+catId+'&tags='+environment.wpTagIds.song+'&order=asc&orderby=title')
      .map((res: Response) => res.json())
      .catch((err: Response | any) => {
        console.error(err)
        return Observable.throw(err);
      });

  }

  public getAlbumMeta(slug): Observable<AlbumMeta> {
    
    return this.http
      .get(this._wpBase + `posts?slug=${slug}`)
      .map((res: Response) => res.json())
      .catch((err: Response | any) => {
        console.error(err)
        return Observable.throw(err);
      });

  }

  public getSong(slug): Observable<Song> {

      return this.http
        .get(this._wpBase + `posts?slug=${slug}`)
        .map((res: Response) => res.json())
        .catch((err: Response | any) => {
          console.error(err)
          return Observable.throw(err);
        });

  }

}

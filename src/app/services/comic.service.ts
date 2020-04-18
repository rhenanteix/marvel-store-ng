import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, from } from 'rxjs';
import { ComicModels } from './comicModels';

@Injectable({
  providedIn: 'root'
})
export class ComicService {

  PRIVATE_KEY = 'eb3a8d1d3dfa7e69ea985c234b279973aab6a411';
  PUBLIC_KEY = '975e663adc65775377ad182e6e601fb8';
  HASH = '419e55a70c3fab062baa30bbdc62bf89';
  URL_API = `https://gateway.marvel.com/v1/public/{method}?ts=1&apikey=${this.PUBLIC_KEY}&hash=${this.HASH}`;
  URL_API_2 = `https://gateway.marvel.com/v1/public/{method}/`;

  constructor(private http: HttpClient) { }

  getComics(): Observable<ComicModels.Comic> {
    return this.http
      .get<ComicModels.Comic>(this.URL_API);
  }
}

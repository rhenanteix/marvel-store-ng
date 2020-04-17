import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MarvelApiService {

   // PRIVATE KEY E PUBLICK KEY PARA AS APIS
  //  ts + PK + PublicK
 // md5(ts+pk + publickey)
 
  PRIVATE_KEY = 'eb3a8d1d3dfa7e69ea985c234b279973aab6a411';
  PUBLIC_KEY  = '975e663adc65775377ad182e6e601fb8';
  HASH = '419e55a70c3fab062baa30bbdc62bf89'; 
  URL_API = `https://gateway.marvel.com/v1/public/{method}?ts=1&apikey=${this.PUBLIC_KEY}&hash=${this.HASH}`;
  URL_API_2 = `https://gateway.marvel.com/v1/public/{method}/`;
   
  

  series_results: [];
  comics_results: [];

  offset: number;
  limit: number; 
  total: number; 

  constructor(private http:HttpClient) {}

  getAllSeries(){

    let promise = new Promise((resolve, reject) => {
      var url = this.URL_API.replace("{method}", "series"); 
      console.log(url);
      this.http.get<any>(url)
      .toPromise()
      .then(
        res => {
          this.series_results = res.data.results;
          resolve();
        },
        msg => {
          reject(msg);
        }
      );
    });
    return promise;
  }

  getSerieByTitle(title: string)
  {

    let promise = new Promise((resolve, reject) => {
      var url = this.URL_API.replace("{method}", "series"); 
      url = url + "&titleStartsWith="+title;
      console.log(url);
      this.http.get<any>(url)
      .toPromise()
      .then(
        res => {
          this.series_results = res.data.results;
          resolve();
        },
        msg => {
          reject(msg);
        }
      );
    });
    return promise;
  }

  getAllComicsBySerie(serieId: number, limit:number, offset:number)
  {
    let promise = new Promise((resolve, reject) => {
      var url = this.URL_API_2.replace("{method}", "series");
      url = url + serieId + '/comics';
      url = url + '?ts=2&apikey=' + this.PUBLIC_KEY + '&hash=' + this.HASH;
  
      if(limit > 0)
      {
        url = url + '&limit=' + limit;
      }

      if(offset > 0)
      {
        url = url + '&offset=' + offset;
      }
      
      this.http.get<any>(url)
      .toPromise()
      .then(
        res => {
          this.limit = res.data.limit;
          this.offset = res.data.offset;
          this.total = res.data.total;
          this.comics_results = res.data.results;
          resolve();
        },
        msg => {
          reject(msg);
        }
      );
    });

    return promise;
  }

  getMethod(url)
  {
      let promise = new Promise((resolve, reject) => {
        url = url + "&apikey=" + this.PUBLIC_KEY + "&hash=" +this.HASH;

        this.http.get<any>(url)
        .toPromise()
        .then(
          res => {
            this.limit = res.data.limit;
            this.offset = res.data.offset;
            this.total = res.data.total;
            this.comics_results = res.data.results;
            resolve();
          },
          msg => {
            reject(msg);
          }
        )
      });
    return promise; 
  }

  getComics(limit: number, offset: number)
  {
    let  promise = new Promise((resolve, reject) => {
        var url = this.URL_API.replace("{method}", "comics");
        var URL_WITH_FILTER = url;

        if(limit > 0)
        {
          URL_WITH_FILTER =  URL_WITH_FILTER + "&limit=" + limit;
        }

        if(offset > 0)
        {
          URL_WITH_FILTER = URL_WITH_FILTER + "&offset=" + offset;
        }

        console.log(URL_WITH_FILTER);
        this.http.get<any>(URL_WITH_FILTER)
        .toPromise()
        .then(
          res => {
            this.limit = res.data.limit;
            this.offset = res.data.offset;
            this.total = res.data.total;
            this.comics_results = res.data.results;
            resolve();
          },
          msg => {
            reject(msg);
          }

        )
    });
    return promise;
  }

  getAllComics(){
    let promise = new Promise((resolve, reject) => {
      var url = this.URL_API.replace("{method}", "comics");
      console.log(url);
      this.http.get<any>(url)
    .toPromise()
    .then( 
        res => {
          this.limit = res.data.limit;
          this.offset = res.data.offset;
          this.total = res.data.total;

          this.comics_results = res.data.results;
          resolve();
        },
        msg => {
          reject(msg);
        }
      )
    });
    return promise;
  } 
}

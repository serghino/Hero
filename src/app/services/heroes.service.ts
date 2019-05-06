import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Iheroe } from '../interfaces/iheroe.object';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  heroeURL: string = `${environment.firebaseHeroURL}heroes.json`;
  heroeLine: string = `${environment.firebaseHeroURL}heroes/`;
  headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    });

  constructor(private http: HttpClient) { }

  addhero(heroe: Iheroe) {
    let body = JSON.stringify(heroe);
    return this.http.post( this.heroeURL, body, {headers : this.headers}).pipe(
      map(resp => { return resp }));
  }
  updatehero(heroe: Iheroe, key$: string) {
    let body = JSON.stringify(heroe);
    let url = `${this.heroeLine}${key$}.json`;
    console.log(url);
    return this.http.put( url, body, {headers : this.headers}).pipe(
      map(resp => resp ));
  }
  gethero(key$: string){
    let url = `${this.heroeLine}${key$}.json`;
    return this.http.get(url).pipe(map(resp => resp));
  }
  getheroes(){
    return this.http.get(this.heroeURL).pipe(map(resp => resp));
  }
  deletehero(key$: string) {
    let url = `${this.heroeLine}${key$}.json`;
    return this.http.delete( url, {headers : this.headers}).pipe(map(resp => resp));
  }
}

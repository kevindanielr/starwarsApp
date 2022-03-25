import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, from, iif, Observable, of } from 'rxjs';
import { concatMap, map, mergeMap, reduce, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { Character, Film, requestResponse } from '../models';
import { requestResponseCharacter } from '../models/responseRequest';

@Injectable({
  providedIn: 'root'
})
export class StarwarService {

  API_URL = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  getFilms() {
    return this.http.get<requestResponse>(this.API_URL + 'films').pipe(
      map( resp => {
        return resp.results.map( film => Film.filmFromJSON( film ))
      })
    );
  }

  getCharacters(page: number) {
    return this.http.get<requestResponseCharacter>(this.API_URL + 'people/?page=' + page);
  }

}

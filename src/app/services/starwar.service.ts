import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, forkJoin, from, iif, Observable, of } from 'rxjs';
import { concatMap, expand, map, mergeMap, reduce, tap } from 'rxjs/operators';
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
      }),
      tap( films => localStorage.setItem('films', JSON.stringify(films)))
    );
  }

  public getCharacter(url?: string): Observable<any> {
    return this.http.get(url && url?.length > 0 ? url : `${this.API_URL}people/?page=1`);
  }

  public getAllCharacter(): Observable<any[]> {
    // the first call is with no parameter so that the default url with no offset is used
    return this.getCharacter().pipe(
       // expand is used to call recursively getCharacter until next is null
       expand(data => data.next === null ? EMPTY : this.getCharacter(data.next)),
       // if you want you can use the reduce operator to emit accumulated array with all results
       reduce((acc, val) => {
         acc = [...acc, ...val.results]
         return acc.map( ch => Character.characterFromJSON(ch))
       }, [])
    )
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EMPTY, forkJoin, Observable } from 'rxjs';
import { expand, map, mergeMap, reduce, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';

import { Character, Film, requestResponse } from '../models';

@Injectable({
    providedIn: 'root'
})
export class StarwarService {

    API_URL = environment.API_URL;

    constructor(
        private http: HttpClient
    ) {}

    /**
    * [Getting all films and saving to localstorage]
    */
    getFilms() {
        return this.http.get < requestResponse > (this.API_URL + 'films').pipe(
            map(resp => {
                return resp.results.map(film => Film.filmFromJSON(film))
            }),
            tap(films => localStorage.setItem('films', JSON.stringify(films)))
        );
    }

    /**
    * [Getting a singular character]
    * @param  {string} url   [url to use in next request]
    * @return {Character}     [Characters info]
    */
    public getCharacter(url ? : string): Observable < requestResponse > {
        return this.http.get < requestResponse > (url && url?.length > 0 ? url : `${this.API_URL}people/?page=1`);
    }

    /**
    * [Get all the characters one by one, until the response of next is null]
    */
    public getAllCharacter(): Observable < Character[] > {
        // the first call is with no parameter so that the default url with no offset is used
        return this.getCharacter().pipe(
            // expand is used to call recursively getCharacter until next is null
            expand(data => data.next === null ? EMPTY : this.getCharacter(data.next)),
            // if you want you can use the reduce operator to emit accumulated array with all results
            reduce((acc, val) => {
                acc = [...acc, ...val.results]
                return acc.map(ch => Character.characterFromJSON(ch))
            }, [])
        )
    }

    /**
    * [Get all the characters of a film one by one]
    * @param  {number} idFilm   [idFilm]
    * @return {Character[]}     [Array Characters]
    */
    getCharactersFilm(idFilm: number) {
        return this.http.get(this.API_URL + "/films/" + idFilm).pipe(
            mergeMap((film: Film) => {
                return forkJoin(
                    film.characters.map(character => {
                        return this.http.get(character)
                    })
                ).pipe(
                    // Transform to a consumable object
                    map(characters => {
                        return {
                            title: film.title,
                            characters:  characters.map( ch => Character.characterFromJSON(ch) )
                        }
                    })
                )
            })
        )
    }

}

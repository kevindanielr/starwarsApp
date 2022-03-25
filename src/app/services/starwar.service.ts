import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { Film, Films } from '../models/film';

@Injectable({
  providedIn: 'root'
})
export class StarwarService {

  API_URL = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  getFilms() {
    return this.http.get<Films>(this.API_URL + 'films').pipe(
      map( resp => {
        return resp.results
      }),
      map( (resp: any) => console.log(resp))
      
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { StarwarService } from '../../services/starwar.service';
import { Film } from '../../models/film';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  displayCrawl: boolean = false;

  constructor(
    private swService: StarwarService
  ) { }

  ngOnInit(): void {
    this.getFilms()
  }

  getFilms() {
    this.swService.getFilms().subscribe( films => console.log(films));
     
  }

}

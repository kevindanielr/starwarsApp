import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StarwarService } from '../../services/starwar.service';
import { Film } from '../../models';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  displayCrawl: boolean = false;
  films: Film[];
  selectedFilm: Film;
  loading: boolean = false;

  constructor(
    private swService: StarwarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getFilms()
  }

  getFilms() {
    this.loading = true;
    this.swService.getFilms().subscribe( (films: Film[]) => {
      this.films = films;
      this.loading = false;
    }, error => {
      this.loading = false;
    }); 
  }

  goCharacterFilm( episode_id: number ) {
    this.router.navigate([ '/characters', episode_id] );
  }

  modalOpening(film: Film) {
    this.selectedFilm = film;
    this.displayCrawl = true;
  }

}

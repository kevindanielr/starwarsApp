import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StarwarService } from '../../services/starwar.service';
import { Film } from '../../models';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  // Variables for film
  films: Film[];
  filmsFilter: Film[];
  selectedFilm: Film;
  
  loading: boolean = false;// Loading
  displayCrawl: boolean = false;// Flag for show modal with opening
  searchTerm: string = "";// Search term

  constructor(
    private swService: StarwarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getFilms()
  }

  /**
   * [Show modal with opening crawl]
   */
  getFilms() {
    this.loading = true;
    this.swService.getFilms().subscribe( (films: Film[]) => {
      this.films = films;
      this.filmsFilter = films;
      this.loading = false;
    }, error => {
      this.loading = false;
    }); 
  }

  /**
   * [Navigate page characters with episode_id param]
   * @param  {number} episode_id [id of episode Film]
   */
  goCharacterFilm( episode_id: number ) {
    this.router.navigate([ '/characters', episode_id] );
  }

  /**
   * [Show modal with opening crawl]
   */
  modalOpening(film: Film) {
    this.selectedFilm = film;
    this.displayCrawl = true;
  }

  /**
   * [Search for films by term]
   */
  search( event ) {    
    if (this.searchTerm === "") {
      this.filmsFilter = this.films;
    } else {
      this.filmsFilter = this.films.filter( film => film.title.toLowerCase().includes(this.searchTerm.toLowerCase()) )
    }
  }

}

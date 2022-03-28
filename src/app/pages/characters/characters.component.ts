import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Character, Film, requestResponseCharacter, requestResponseFilm } from 'src/app/models';
import { Gender, EyeColor } from '../../models/character';

import { StarwarService } from 'src/app/services/starwar.service';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  // Variables for handling characters 
  characters: Character[];// All characters
  charactersPage: Character[];// Characters per page
  charactersFilter: Character[];// Characters by filters

  // Flag for show characters from a movie
  isCharactersFilm: boolean = false;

  // Object Film selected for show opening crawl
  selectedFilmCrawl: Film;
  displayCrawl: boolean = false;
  actualTitle: string = "";
  idFilm: number;

  // Variables for dropdown filters
  eyeColors: EyeColor[] =[
    {eye_color: 'red'},
    {eye_color: 'blue'},
    {eye_color: 'green'},
    {eye_color: 'yellow'},
    {eye_color: 'brown'},
    {eye_color: 'blue-gray'},
    {eye_color: 'black'},
    {eye_color: 'hazel'},
    {eye_color: 'pink'},
    {eye_color: 'gold'},
    {eye_color: 'unknown'}
  ];
  genders: Gender[] =[
    {gender: 'Male'},
    {gender: 'Female'},
    {gender: 'Hermaphrodite'},
    {gender: 'None'},
    {gender: 'N/A'}
  ];
  films: Film[];

  // Variables for filters
  selectedEyeColor: EyeColor = null;
  selectedGender: Gender = null;
  selectedFilm: Film = null;

  // Flag loading
  loading: boolean = false;

  // String for searchbar
  searchTerm: string = "";

  @ViewChild('p', {static: false}) paginator: Paginator;

  constructor(
    private swService: StarwarService,
    private activadedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Getting movies from localstorage
    this.films = JSON.parse(localStorage.getItem('films'));

    // Getting Film id in url
    this.activadedRoute.params.subscribe( params => {
      this.idFilm = params['idFilm'];
      if (this.idFilm !== undefined) {
        // Getting characters from a film
        this.getFilmCharacter(this.idFilm);
        this.isCharactersFilm = true;
      } else {
        // Getting all the characters
        this.getAllCharacters();
      } 
    });
  }

  /**
   * [Show on modal screen with opening crawl]
   */
  selectFilm( event ) {
    this.selectedFilmCrawl = Film.filmFromJSON(event.value);
    this.displayCrawl = true;
  }

  /**
   * [Getting all the characters]
   */
  getAllCharacters(){
    this.loading = true;
    this.actualTitle = "";
    this.isCharactersFilm = false;
    this.swService.getAllCharacter().subscribe( (character: Character[]) => {
      this.characters = character;
      this.charactersFilter = character;
      this.charactersPage = this.characters.slice(0, 10);
      this.loading = false;   
    }, error => {
      this.loading = false;
    })
  }

  /**
   * [Getting all characters from a specific movie]
   */
  getFilmCharacter(idFilm : number) {
    this.loading = true;
    this.swService.getCharactersFilm( idFilm ).subscribe(  (response: requestResponseFilm) => {
      this.actualTitle = response.title
      this.characters = response.characters;
      this.charactersFilter = response.characters;
      this.charactersPage = this.characters.slice(0, 10);
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }

  /**
   * [Page change]
   */
  paginate(event) {
    this.charactersPage = this.charactersFilter.slice(event.page * 10, (event.page + 1) * 10); 
  }

  /**
   * [Reset page and filter characters depending on selection of p-selects]
   */
  filter(event?) {
    this.paginator.changePage(0);
    
    if (this.selectedEyeColor === null && this.selectedGender === null && this.selectedFilm === null) {
      this.charactersFilter = this.characters;
      this.charactersPage = this.characters.slice(0, 10); 
    } else {

      let tempCharacters = this.characters;

      if (this.selectedEyeColor !== null) {
        tempCharacters = tempCharacters.filter( 
          character => 
          character?.eye_color?.includes(this.selectedEyeColor?.eye_color))
      }

      if (this.selectedGender !== null) {
        tempCharacters = tempCharacters.filter( 
          character => 
          character.gender.toLowerCase() === this.selectedGender?.gender?.toLowerCase())
      }

      if (this.selectedFilm !== null) {
        tempCharacters = tempCharacters.filter( 
          character => {
            return character.filmsArray.find( film => film.title.toLowerCase() === this.selectedFilm.title.toLowerCase() )
            })
      }
      
      this.charactersPage = tempCharacters.slice(0, 10); 
      this.charactersFilter = tempCharacters;
    }
  }

  /**
   * [Search for characters by term]
   */
  search( event ) {        
    if (this.searchTerm === "") {
      this.filter();
    } else {
      this.charactersFilter = this.charactersFilter.filter( character => character.name.toLowerCase().includes(this.searchTerm.toLowerCase()) )
      this.charactersPage = this.charactersFilter.slice(0, 10);       
    }
  }

}

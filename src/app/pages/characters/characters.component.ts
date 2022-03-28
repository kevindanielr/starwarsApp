import { Component, OnInit, ViewChild } from '@angular/core';
import { Character, requestResponse } from 'src/app/models';
import { EyeColor } from 'src/app/models/character';
import { requestResponseCharacter, requestResponseFilm } from 'src/app/models/responseRequest';
import { StarwarService } from 'src/app/services/starwar.service';
import { Film } from '../../models/film';
import { Gender } from '../../models/character';
import { Paginator } from 'primeng/paginator';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {


  rspCharacter: requestResponseCharacter;
  characters: Character[];
  charactersPage: Character[];
  charactersFilter: Character[];

  selectedFilmCrawl: Film;
  displayCrawl: boolean = false;
  isCharactersFilm: boolean = false;

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

  selectedEyeColor: EyeColor = null;
  selectedGender: Gender = null;
  selectedFilm: Film = null;

  actualTitle: string = "";

  idFilm: number;
  loading: boolean = false;

  searchTerm: string = "";

  @ViewChild('p', {static: false}) paginator: Paginator;

  constructor(
    private swService: StarwarService,
    private activadedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.films = JSON.parse(localStorage.getItem('films'));

    this.activadedRoute.params.subscribe( params => {
      this.idFilm = params['idFilm'];
      
      if (this.idFilm !== undefined) {
        this.getFilmCharacter(this.idFilm);
        this.isCharactersFilm = true;
      } else {
        this.getAllCharacters();
      }
      
    });


  }

  selectFilm( event ) {
    this.selectedFilmCrawl = Film.filmFromJSON(event.value);
    this.displayCrawl = true;
  }

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

  paginate(event) {
    this.charactersPage = this.charactersFilter.slice(event.page * 10, (event.page + 1) * 10); 
  }

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

  filterGender(event) {

    this.paginator.changePage(0);
    
    if (event.value === null) {
      this.charactersFilter = this.characters;
      this.charactersPage = this.characters.slice(0, 10); 
    } else {
      
      let tempCharacters = [] = this.characters.filter( character => character.eye_color.includes(event.value.eye_color)  )

      this.charactersPage = tempCharacters.slice(0, 10); 
      this.charactersFilter = tempCharacters;
    }
    
  }

  search( event ) {   
    console.log(this.searchTerm);
     
    if (this.searchTerm === "") {
      this.filter();
    } else {
      this.charactersFilter = this.charactersFilter.filter( character => character.name.toLowerCase().includes(this.searchTerm.toLowerCase()) )
      this.charactersPage = this.charactersFilter.slice(0, 10); 
      console.log(this.charactersFilter);
      
    }
  }

}

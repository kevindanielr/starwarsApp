import { Component, OnInit, ViewChild } from '@angular/core';
import { Character, requestResponse } from 'src/app/models';
import { EyeColor } from 'src/app/models/character';
import { requestResponseCharacter } from 'src/app/models/responseRequest';
import { StarwarService } from 'src/app/services/starwar.service';
import { Film } from '../../models/film';
import { Gender } from '../../models/character';
import { Paginator } from 'primeng/paginator';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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

  selectedFilm: Film;
  displayCrawl: boolean = false;

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
    {gender: 'None'}
  ];

  films: Film[];

  selectedEyeColor: EyeColor = null;
  selectedGender: Gender = null;
  selectedFilms: Film[] = [];

  @ViewChild('p', {static: false}) paginator: Paginator;

  constructor(
    private swService: StarwarService
  ) { }

  ngOnInit(): void {
    this.films = JSON.parse(localStorage.getItem('films'));
    this.getAllCharacters();
  }

  selectFilm( event ) {
    this.selectedFilm = Film.filmFromJSON(event.value);
    this.displayCrawl = true;
  }

  getAllCharacters(){
    this.swService.getAllCharacter().subscribe( (character: Character[]) => {
      this.characters = character;
      this.charactersFilter = character;
      this.charactersPage = this.characters.slice(0, 10);     
    })
  }

  paginate(event) {
    this.charactersPage = this.charactersFilter.slice(event.page * 10, (event.page + 1) * 10); 
  }

  filter(event) {

    this.paginator.changePage(0);
    
    if (this.selectedEyeColor === null && this.selectedGender === null) {
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

      this.charactersPage = tempCharacters.slice(0, 10); 
      this.charactersFilter = tempCharacters;
      console.log(this.charactersFilter);
      
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

}

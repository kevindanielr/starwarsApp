import { Component, OnInit } from '@angular/core';
import { Character, requestResponse } from 'src/app/models';
import { eyeColor } from 'src/app/models/character';
import { requestResponseCharacter } from 'src/app/models/responseRequest';
import { StarwarService } from 'src/app/services/starwar.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {


  rspCharacter: requestResponseCharacter;
  characters: Character[];
  charactersPage: Character[];
  currentPage: number = 1;

  eyeColor: eyeColor[] =[
    {
      eye_color: 'red'
    },
    {
      eye_color: 'blue'
    },
    {
      eye_color: 'yellow'
    },
    {
      eye_color: 'brown'
    },
    {
      eye_color: 'blue-gray'
    }
  ];

  selectedEyeColor: eyeColor[];

  constructor(
    private swService: StarwarService
  ) { }

  ngOnInit(): void {
    this.getCharacters( this.currentPage );
    this.getAllCharacters( this.currentPage );
  }

  getCharacters(page: number){
    this.swService.getCharacters( page ).subscribe( (rqResponse: requestResponseCharacter) => {
      this.rspCharacter= rqResponse;      
      this.characters = rqResponse.results;     
    })
  }

  getAllCharacters(page: number){
    this.swService.getCharacters( page ).subscribe( (rqResponse: requestResponseCharacter) => {
      let pages = Math.ceil(rqResponse.count / 10);
      
      for (let index = 1; index < pages; index++) {
        this.swService.getCharacters( index ).subscribe( (rqResponse: requestResponseCharacter) => {
          console.log(index);
          
          this.characters.push(...rqResponse.results)
          this.charactersPage = this.characters.slice(0, 10);
          console.log(this.charactersPage, this.characters);
          
        });
      }
         
    })
  }

  paginate(event) {
    this.getCharacters( event.page + 1 );
  }

}

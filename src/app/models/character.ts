export class Character {

    // Convert from JSON to object of type Character
    static characterFromJSON( obj: Object) {
        return new Character(
            obj['name'],
            obj['height'],
            obj['mass'],
            obj['hair_color'],
            obj['skin_color'],
            obj['eye_color'],
            obj['birth_year'],
            obj['gender'],
            obj['films']
        );
    }

    constructor(
        public name:       string,
        public height:     string,
        public mass:       string,
        public hair_color: string,
        public skin_color: string,
        public eye_color:  string,
        public birth_year: string,
        public gender:     string,
        public films:      string[],
    ) {}

    /**
    * [Return an array of movie names]
    */
    get filmsArray() {
        let filmsLocal = JSON.parse(localStorage.getItem('films'));
        return this.films.map( film => {
            return filmsLocal.find( filmFind => filmFind.url === film) 
        })
    }

}

export interface EyeColor {
    eye_color: string;
}

export interface Gender {
    gender: string;
}
export class Character {

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

}

export interface eyeColor {
    eye_color: string;
}
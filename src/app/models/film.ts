export class Film {

    static filmFromJSON( obj: Object) {
        return new Film(
            obj['title'],
            obj['episode_id'],
            obj['opening_crawl'],
            obj['director'],
            obj['characters']
        );
    }

    constructor(
        public title:         string,
        public episode_id:    number,
        public opening_crawl: string,
        public director:      string,
        public characters:    string[]
    ) {}

    get episodeDirectorName() {
        return `Episode ${ this.convertToRoman(this.episode_id) } / Director: ${this.director}`
    }

    get episodeNumber() {
        return `Episode ${ this.convertToRoman(this.episode_id) }`
    }

    convertToRoman(num) {
        var roman = {
          M: 1000,
          CM: 900,
          D: 500,
          CD: 400,
          C: 100,
          XC: 90,
          L: 50,
          XL: 40,
          X: 10,
          IX: 9,
          V: 5,
          IV: 4,
          I: 1
        };
        var str = '';
      
        for (var i of Object.keys(roman)) {
          var q = Math.floor(num / roman[i]);
          num -= q * roman[i];
          str += i.repeat(q);
        }
      
        return str;
      }
}
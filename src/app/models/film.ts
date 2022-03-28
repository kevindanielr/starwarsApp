export class Film {

    // Convert from JSON to object of type Character
    static filmFromJSON( obj: Object) {
        return new Film(
            obj['title'],
            obj['episode_id'],
            obj['opening_crawl'],
            obj['director'],
            obj['url'],
            obj['characters']
        );
    }

    constructor(
        public title:         string,
        public episode_id:    number,
        public opening_crawl: string,
        public director:      string,
        public url:           string,
        public characters:    string[]
    ) {}

    /**
    * [Return a episode name with director name]
    */
    get episodeDirectorName() {
        return `Episode ${ this.convertToRoman(this.episode_id) } / Director: ${this.director}`
    }

    /**
    * [Return a episode number Roman]
    */
    get episodeNumber() {
        return `Episode ${ this.convertToRoman(this.episode_id) }`
    }

    /**
    * [Return the id of the movie url]
    */
    get idUrl() {
        return this.url.split('/')[5];
    } 

    /**
    * [Returns a Roman number]
    * @param  {number} num  [The number you want to convert]
    * @return {string}      [Roman number]
    */
    convertToRoman(num: number) {
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
import { Character } from "./character";
import { Film } from "./film";

export interface requestResponse {
    count:    number;
    next:     null;
    previous: null;
    results:  Film[];
}

export interface requestResponseCharacter {
    count:    number;
    next:     null;
    previous: null;
    results:  Character[];
}

export interface requestResponseFilm {
    title:       string;
    characters:  Character[];
}
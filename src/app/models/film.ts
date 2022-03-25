export interface Films {
    count:    number;
    next:     null;
    previous: null;
    results:  Film[];
}

export interface Film {
    title:         string;
    episode_id:    number;
    opening_crawl: string;
    director:      string;
    characters:    string[];
}
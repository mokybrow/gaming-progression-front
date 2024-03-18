import { GamePageResponse, GamesResponse } from "@/models/gamesModel";
import GameService from "@/services/gamesService";
import { makeAutoObservable } from "mobx"


export default class GamesStore {
    isLoading = false;
    limit = 20
    genres = [] as string[]
    platforms = [] as string[]
    release_date = [] as number[]
    games = [] as GamesResponse[];
    gamePage = {} as GamePageResponse;
    slider_values = [1954, 2024]

    sort = {
        "name": "title",
        "type": "asc"
    }
    incrementLimit = () => {
        this.limit += 20;
    };
    constructor() {
        makeAutoObservable(this);
    }

    setLimit(set: number) {
        this.limit = set
    }

    setGames(games: GamesResponse[]) {
        this.games = games;
    }

    setGamePage(games: GamePageResponse) {
        this.gamePage = games;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setGenre(genre: string[]) {
        this.genres = genre;
    }

    setPlatform(platform: string[]) {
        this.platforms = platform;
    }

    setRelease(release: number[]) {
        this.release_date = release;
    }

    setSliderValues(slider_values: number[]) {
        this.slider_values = slider_values;
    }


    setSort(name: string, type: string) {
        this.sort['name'] = name
        this.sort['type'] = type
    }

    async getAllGames(genre: string[] | null, platform: string[] | null, age: string | null, release: number[] | null, limit: number, offset: number, sort: any) {
        this.setLoading(true);
        try {
            const response = await GameService.getAllGames(genre, platform, age, release, limit, offset, sort);
            this.setGames(response.data)
            this.setLoading(false);

        } catch {
            this.setGames([] as GamesResponse[])
        }
    }

    async getGamePage(slug: string) {
        this.setLoading(true);
        try {
            const response = await GameService.getGamePage(slug);
            this.setGamePage(response.data)
            this.setLoading(false);

        } catch {
            this.setGamePage({} as GamePageResponse)
        }
    }


}

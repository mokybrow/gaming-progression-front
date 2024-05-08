import { CommentsResponseModel } from "@/models/commentsModels";
import { GamePageResponse, GamesCount, GamesResponse } from "@/models/gamesModel";
import { CommentsResponse, SearchGamesCountModel, SearchGamesModel, UserCommentsLikes } from "@/models/serviceModel";
import AuthService from "@/services/authService";
import ContentService from "@/services/contentService";
import GameService from "@/services/gamesService";
import { makeAutoObservable } from "mobx"


export default class GamesStore {
    isLoading = false;
    genres = [] as number[]
    platforms = [] as number[]
    releaseDate = [] as number[]
    ageRating = [] as number[]
    games = [] as GamesResponse[];
    searchedGames = [] as SearchGamesModel[];
    gamesCount = 0;
    gamesSearchCount = 0;
    comments = [] as CommentsResponseModel[];
    commentsLikes = [] as UserCommentsLikes[];
    gamePage = {} as GamePageResponse;
    slider_values = [1954, 2024]
    rate = 0
    sort = {
        "name": "title",
        "type": "asc"
    }

    page = 20


    constructor() {
        makeAutoObservable(this);
    }

    setGames(games: GamesResponse[]) {
        this.games = games;
    }

    setSearchedGames(games: SearchGamesModel[]) {
        this.searchedGames = games;
    }

    setGamesCount(gamesCount: number) {
        this.gamesCount = gamesCount;
    }
    setSearchGamesCount(count: number) {
        this.gamesSearchCount = count;
    }
    setComments(comments: CommentsResponseModel[]) {
        this.comments = comments;
    }

    setCommentsLikes(likes: UserCommentsLikes[]) {
        this.commentsLikes = likes;
    }
    setGameRate(rate: number) {
        this.rate = rate;
    }

    setPage(count: number) {
        this.page = count;
    }
    setGamePage(games: GamePageResponse) {
        this.gamePage = games;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setGenre(genre: number[]) {
        this.genres = genre;
    }

    setPlatform(platform: number[]) {
        this.platforms = platform;
    }

    setRelease(release: number[]) {
        this.releaseDate = release;
    }

    setAgeRating(age: number[]) {
        this.ageRating = age;
    }

    setSliderValues(slider_values: number[]) {
        this.slider_values = slider_values;
    }


    setSort(name: string, type: string) {
        this.sort['name'] = name
        this.sort['type'] = type
    }

    async getAllGames(genre: number[] | null, platform: number[] | null, age: number[] | null, release: number[] | null, page: number, sort: any) {
        this.setLoading(true);
        try {
            const response = await GameService.getAllGames(genre, platform, age, release, page, sort);

            this.setGames(response.data)


            this.setGamesCount(response.headers['x-games-count'])
        } catch (error) {
            this.setGamesCount(0)
        }
        finally {
            this.setLoading(false);
        }
    }
    async getAllGamesScroll(genre: number[] | null, platform: number[] | null, age: number[] | null, release: number[] | null, page: number, sort: any) {
        this.setLoading(true);
        try {
            const response = await GameService.getAllGames(genre, platform, age, release, page, sort);

            this.setGames([...this.games, ...response.data])


            this.setGamesCount(response.headers['x-games-count'])
        } catch (error) {
            this.setGamesCount(0)
        }
        finally {
            this.setLoading(false);
        }
    }

    async filterGames(genre: number[] | null, platform: number[] | null, age: number[] | null, release: number[] | null, page: number, sort: any) {
        this.setLoading(true);
        try {
            const response = await GameService.getAllGames(genre, platform, age, release, page, sort);

            this.setGames(response.data)

            this.setGamesCount(response.headers['x-games-count'])
        } catch (error) {
            this.setGamesCount(0)
        }
        finally {
            this.setLoading(false);

        }

    }


    async addNewComment(itemId: string, text: string, parentCommntId?: string | null) {
        this.setLoading(true);
        try {
            await ContentService.addNewComment(itemId, text, parentCommntId)
            // const result = await ContentService.getComments(itemId)
            // this.setComments(result.data)
            this.setLoading(false);

        } catch (error) {

        }
    }


    async addGameGrade(gameId: string, grade: number) {
        try {
            console.log(gameId, grade)
            await GameService.addRateGame(gameId, grade)


        } catch (error) {

        }
    }

    async delGameGrade(gameId: string) {
        try {
            await GameService.delRateGame(gameId)

        } catch (error) {

        }
    }

    async searchGames(searchString: string, page: number) {
        try {
            const result = await ContentService.SearchGames(searchString, page)
            this.setSearchedGames([...this.searchedGames, ...result.data])
            this.setSearchGamesCount(result.headers['x-games-count'])
            return result
        } catch (error) {

        }
    }

}


import { CommentsResponseModel } from "@/models/commentsModels";
import { GamePageResponse, GamesCount, GamesResponse } from "@/models/gamesModel";
import { CommentsResponse, SearchGamesCountModel, SearchGamesModel, UserCommentsLikes } from "@/models/serviceModel";
import AuthService from "@/services/authService";
import ContentService from "@/services/contentService";
import GameService from "@/services/gamesService";
import { makeAutoObservable } from "mobx"
import { date } from "yup";


export default class GamesStore {
    isLoading = false;
    limit = 20
    searchLimit = 10
    genres = [] as string[]
    platforms = [] as string[]
    release_date = [] as number[]
    games = [] as GamesResponse[];
    searchedGames = [] as SearchGamesModel[];
    gamesCount = {} as GamesCount;
    gamesSearchCount = {} as SearchGamesCountModel;
    comments = [] as CommentsResponseModel[];
    commentsLikes = [] as UserCommentsLikes[];
    gamePage = {} as GamePageResponse;
    slider_values = [1954, 2024]
    rate = 0
    sort = {
        "name": "title",
        "type": "asc"
    }

    incrementLimit = () => {
        this.limit += 20;
    };

    incrementSearchLimit = () => {
        this.searchLimit += 10;
    };

    constructor() {
        makeAutoObservable(this);
    }

    setLimit(set: number) {
        this.limit = set
    }

    setSearchLimit(set: number) {
        this.searchLimit = set
    }

    setGames(games: GamesResponse[]) {
        this.games = games;
    }

    setSearchedGames(games: SearchGamesModel[]) {
        this.searchedGames = games;
    }

    setGamesCount(gamesCount: GamesCount) {
        this.gamesCount = gamesCount;
    }
    setSearchGamesCount(count: SearchGamesCountModel) {
        this.gamesSearchCount= count;
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

        } catch {
            this.setGames([] as GamesResponse[])
        }
        try {
            const gameCount = await GameService.getGamesCount(genre, platform, age, release);
            this.setGamesCount(gameCount.data)

        } catch (error) {
            this.setGamesCount({ game_count: 0 })
        }
        finally {
            this.setLoading(false);

        }

    }

    async getGamePage(slug: string) {
        this.setLoading(true);
        try {
            const game = await GameService.getGamePage(slug);
            try {
                const userId = await AuthService.getProfile()
                const result = await ContentService.getComments(game.data.id, userId.data.id)
                this.setComments(result.data)

            } catch (error) {
                const result = await ContentService.getComments(game.data.id, null)
                this.setComments(result.data)
            }
            this.setGamePage(game.data)

        } catch {
            this.setGamePage({} as GamePageResponse)
        }
        try {
            const likes = await ContentService.getUserCommentsLikes(this.gamePage.id)
            this.setCommentsLikes(likes.data)
        } catch (error) {

        }
        try {
            const rate = await ContentService.getUserGameRate(this.gamePage.id)
            this.setGameRate(rate.data)

        } catch (error) {

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

    async searchGames(searchString: string, limit: number) {
        try {
            const result = await ContentService.SearchGames(searchString, limit)
            const count = await ContentService.SearchGamesCount(searchString)
            this.setSearchedGames(result.data)
            this.setSearchGamesCount(count.data)
        } catch (error) {

        }
    }

}


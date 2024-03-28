import { GamePageResponse, GamesCount, GamesResponse } from "@/models/gamesModel";
import { CommentsResponse, SearchGamesModel, UserCommentsLikes } from "@/models/serviceModel";
import ContentService from "@/services/contentService";
import GameService from "@/services/gamesService";
import { makeAutoObservable } from "mobx"
import { date } from "yup";


export default class GamesStore {
    isLoading = false;
    limit = 20
    genres = [] as string[]
    platforms = [] as string[]
    release_date = [] as number[]
    games = [] as GamesResponse[];
    searchedGames = [] as SearchGamesModel[];
    gamesCount = {} as GamesCount;
    comments = [] as CommentsResponse[];
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
    constructor() {
        makeAutoObservable(this);
    }

    setLimit(set: number) {
        this.limit = set
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
    setComments(comments: CommentsResponse[]) {
        this.comments = comments;
    }

    setCommentsLikes(likes: UserCommentsLikes[]) {
        this.commentsLikes = likes;
    }
    setGameRate(rate: number) {
        this.rate = rate;
    }

    setCommentsLikeIncrease(commentId: string) {
        this.comments.forEach(function (obj) {
            if (obj.id === commentId) {
                obj.like_count += 1

            }
        });
        this.commentsLikes.forEach(function (has) {
            if (has.id === commentId) {
                has.hasAuthorLike = 1
            }
        });
        if (!this.commentsLikes.find((i) => i.id === commentId)) {
            this.commentsLikes.push({ id: commentId, hasAuthorLike: 1 })
        }
    }

    setCommentsLikeDecrease(commentId: string) {
        this.comments.forEach(function (obj) {
            if (obj.id === commentId) {
                obj.like_count -= 1
            }
        });
        this.commentsLikes.forEach(function (has) {
            if (has.id === commentId) {
                has.hasAuthorLike = 0
            }
        });
    }

    setChildCommentsLikeIncrease(commentId: string) {
        this.comments.forEach(function (obj) {
            obj.child_comment.forEach(function (child) {
                if (child.id === commentId) {
                    child.like_count += 1

                }
            })

        });
        this.commentsLikes.forEach(function (has) {
            if (has.id === commentId) {
                has.hasAuthorLike = 1
            }
        });
        if (!this.commentsLikes.find((i) => i.id === commentId)) {
            this.commentsLikes.push({ id: commentId, hasAuthorLike: 1 })
        }
    }
    setChildCommentsLikeDecrease(commentId: string) {
        this.comments.forEach(function (obj) {
            obj.child_comment.forEach(function (child) {
                if (child.id === commentId) {
                    child.like_count -= 1

                }
            })

        });
        this.commentsLikes.forEach(function (has) {
            if (has.id === commentId) {
                has.hasAuthorLike = 0
            }
        });
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
            const response = await GameService.getGamePage(slug);
            const result = await ContentService.getComments(response.data.id)
            this.setGamePage(response.data)
            this.setComments(result.data)

          
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
            const result = await ContentService.getComments(itemId)
            this.setComments(result.data)
            this.setLoading(false);

        } catch (error) {

        }
    }

    async getGameComments(itemId: string) {
        this.setLoading(true);
        try {
            const result = await ContentService.getComments(itemId)
            this.setComments(result.data)
            this.setLoading(false);

        } catch (error) {

        }
    }


    async likeComment(itemId: string, typeId: string, value: boolean) {
        try {
            await ContentService.likeContent(itemId, typeId, value)
            // const likes = await ContentService.getUserCommentsLikes(this.gamePage.id)
            // this.setCommentsLikes(likes.data)
            // const result = await ContentService.getComments(this.gamePage.id)
            // this.setComments(result.data)

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

    async searchGames(searchString: string) {
        try {
            const result = await ContentService.SearchGames(searchString)
            this.setSearchedGames(result.data)
        } catch (error) {

        }
    }

}


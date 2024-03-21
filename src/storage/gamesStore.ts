import { GamePageResponse, GamesResponse } from "@/models/gamesModel";
import { CommentsResponse, UserCommentsLikes } from "@/models/serviceModel";
import ContentService from "@/services/contentService";
import GameService from "@/services/gamesService";
import { makeAutoObservable } from "mobx"


export default class GamesStore {
    isLoading = false;
    limit = 20
    genres = [] as string[]
    platforms = [] as string[]
    release_date = [] as number[]
    games = [] as GamesResponse[];
    comments = [] as CommentsResponse[];
    commentsLikes = [] as UserCommentsLikes[];
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
    setComments(comments: CommentsResponse[]) {
        this.comments = comments;
    }

    setCommentsLikes(likes: UserCommentsLikes[]) {
        this.commentsLikes = likes;
    }

    setCommentsLikeIncrease(commentId: string) {
        this.comments.forEach(function (obj) {
            if (obj.id === commentId) {
                obj.like_count += 1

            }
        });
    }
    setCommentsLikeDecrease(commentId: string) {
        this.comments.forEach(function (obj) {
            if (obj.id === commentId) {
                obj.like_count -= 1

            }
        });
    }

    setChildCommentsLikeIncrease(commentId: string) {
        this.comments.forEach(function (obj) {
            obj.child_comment.forEach(function(child){
                if (child.id === commentId) {
                    child.like_count += 1
    
                }
            })
            
        });
    }
    setChildCommentsLikeDecrease(commentId: string) {
        this.comments.forEach(function (obj) {
            obj.child_comment.forEach(function(child){
                if (child.id === commentId) {
                    child.like_count -= 1
    
                }
            })
            
        });
    }

    setCommentsLikesNewValue(commentId: string) {
        this.commentsLikes.forEach(function (obj) {
            if (obj.id === commentId) {
                if (obj.hasAuthorLike == 1) {
                    obj.hasAuthorLike = 0
                }
                else {
                    obj.hasAuthorLike = 1

                }
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
            this.setLoading(false);

        } catch {
            this.setGames([] as GamesResponse[])
        }
    }

    async getGamePage(slug: string) {
        this.setLoading(true);
        try {
            const response = await GameService.getGamePage(slug);
            const result = await ContentService.getComments(response.data.id)
            this.setGamePage(response.data)
            this.setComments(result.data)
            const likes = await ContentService.getUserCommentsLikes(response.data.id)
            this.setCommentsLikes(likes.data)
            
        } catch {
            this.setGamePage({} as GamePageResponse)
        }
        this.setLoading(false);
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
            const likes = await ContentService.getUserCommentsLikes(this.gamePage.id)
            this.setCommentsLikes(likes.data)
            const result = await ContentService.getComments(this.gamePage.id)
            this.setComments(result.data)

        } catch (error) {

        }
    }


}


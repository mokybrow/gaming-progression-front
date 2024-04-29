import $api from "@/api/api";
import { GamePageResponse, GamesCount, GamesResponse } from "@/models/gamesModel";
import axios, { AxiosResponse } from "axios";

export default class GameService {

    static async getAllGames(genre: string[] | null, platform: string[] | null, age: string | null, release: number[] | null,  page: number, sort: any): Promise<AxiosResponse<GamesResponse[]>> {
        const url = process.env.API_URL + 'games'
        return axios.post<GamesResponse[]>(url,
            {
                genre: genre,
                platform: platform,
                age: age,
                release: release,
                page: page,
                sort: sort,
            },
        )
    }
    static async getGamesCount(genre: string[] | null, platform: string[] | null, age: string | null, release: number[] | null): Promise<AxiosResponse<GamesCount>> {
        const url = process.env.API_URL + 'games/count'
        return axios.post<GamesCount>(url,
            {
                genre: genre,
                platform: platform,
                age: age,
                release: release,
      
            },
        )
    }
    static async getGamePage(slug: string): Promise<AxiosResponse<GamePageResponse>> {
        const url = process.env.API_URL + 'games'
        return axios.get<GamePageResponse>(url + `/${slug}`,
        )
    }
    static async changeGameStatus(gameId: string, activityType: string): Promise<AxiosResponse<GamePageResponse>> {
        const url = process.env.API_URL + 'games/statuses'
        return $api.post<GamePageResponse>(url,
            {
                game_id: gameId,
                activity_type: activityType
            }
        )
    }

    static async addGameToFavorite(gameId: string): Promise<AxiosResponse<GamePageResponse>> {
        const url = process.env.API_URL + 'games/favorites'
        return $api.post<GamePageResponse>(url,
            {
                game_id: gameId,
            }
        )
    }

    static async addRateGame(gameId: string, grade: number): Promise<AxiosResponse> {
        const url = process.env.API_URL + 'games/rate'
        return $api.post(url,
            {
                game_id: gameId,
                grade: grade,
            }
        )
    }

    static async delRateGame(gameId: string,): Promise<AxiosResponse> {
        const url = process.env.API_URL + `games/rate/${gameId}`
        return $api.delete(url,
        )
    }
}
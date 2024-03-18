import $api from "@/api/api";
import { GamePageResponse, GamesResponse } from "@/models/gamesModel";
import axios, { AxiosResponse } from "axios";

export default class GameService {

    static async getAllGames(genre: string[] | null, platform: string[] | null, age: string | null, release: number[] | null, limit: number, offset: number, sort: any): Promise<AxiosResponse<GamesResponse[]>> {
        const url = process.env.API_URL + 'games'
        return axios.post<GamesResponse[]>(url,
            {
                genre: genre,
                platform: platform,
                age: age,
                release: release,
                limit: limit,
                offset: offset,
                sort: sort,
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
}
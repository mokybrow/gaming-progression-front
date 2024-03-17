import { GamesResponse } from "@/models/gamesModel";
import axios, { AxiosResponse } from "axios";

export default class GameService {

    static async getGamesPage(genre: string[] | null, platform: string[] | null, age: string | null, release: number[] | null, limit: number, offset: number, sort: any): Promise<AxiosResponse<GamesResponse[]>> {
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
            {
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': 'your-rapidapi-key',
                    'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
                },
            })
    }

}
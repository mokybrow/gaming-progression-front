import $api from "@/api/api";
import { GamePageResponse, GamesCount, GamesResponse } from "@/models/gamesModel";
import { IGeneralUserModel } from "@/models/userModel";
import axios, { AxiosResponse } from "axios";

export default class UserService {

    static async getUserProfile(username: string): Promise<AxiosResponse<IGeneralUserModel>> {
        const url = process.env.API_URL 
        return axios.get<IGeneralUserModel>(url + `users/${username}`
        )
    }
}
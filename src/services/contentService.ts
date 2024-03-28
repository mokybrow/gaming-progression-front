import axios, { AxiosResponse } from "axios";
import $api from "@/api/api";
import { CommentsResponse, SearchGamesModel, UserCommentsLikes } from "@/models/serviceModel";
import { SearchUserModel } from "@/models/userModel";

export default class ContentService {

    static async addNewComment(itemId: string, text: string, parentCommntId?: string | null): Promise<AxiosResponse> {
        const url = process.env.API_URL + 'comments'
        return $api.post(url,
            {
                item_id: itemId,
                parent_comment_id: parentCommntId,
                text: text,
                deleted: false

            }
        )
    }

    static async getComments(itemId: string): Promise<AxiosResponse<CommentsResponse[]>> {
        const url = process.env.API_URL + 'comments/'
        return axios.get<CommentsResponse[]>(url + `${itemId}`
        )
    }

    static async getUserCommentsLikes(itemId: string): Promise<AxiosResponse<UserCommentsLikes[]>> {
        const url = process.env.API_URL + `comments/likes`
        return $api.post<UserCommentsLikes[]>(url,
            {
                item_id: itemId,
            }
        )
    }

    static async getUserGameRate(itemId: string): Promise<AxiosResponse> {
        const url = process.env.API_URL + `games/rate/${itemId}`
        return $api.get(url,

        )
    }

    static async likeContent(itemId: string, typeId: string, value: boolean): Promise<AxiosResponse> {
        const url = process.env.API_URL + `likes`
        return $api.post(url,
            {
                type_id: typeId,
                item_id: itemId,
                value: value,
            }
        )
    }

    static async SearchUser(value: string): Promise<AxiosResponse<SearchUserModel[]>> {
        const url = process.env.API_URL + `users/search/${value}`
        return axios.get<SearchUserModel[]>(url)
    }


    static async SearchGames(searchString: string): Promise<AxiosResponse<SearchGamesModel[]>> {
        const url = process.env.API_URL + `search/games`
        return axios.post<SearchGamesModel[]>(url, {
            search_string: searchString

        })
    }


}
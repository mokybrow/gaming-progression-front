import axios, { AxiosResponse } from "axios";
import $api from "@/api/api";
import { CommentsResponse, SearchGamesCountModel, SearchGamesModel, UserCommentsLikes } from "@/models/serviceModel";
import { SearchUserModel } from "@/models/userModel";
import { PostsCount, PostsResponseModel } from "@/models/postsModel";

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


    static async SearchGames(searchString: string, limit: number): Promise<AxiosResponse<SearchGamesModel[]>> {
        const url = process.env.API_URL + `search/games`
        return axios.post<SearchGamesModel[]>(url, {
            search_string: searchString,
            limit: limit

        })
    }

    static async SearchGamesCount(searchString: string): Promise<AxiosResponse<SearchGamesCountModel>> {
        const url = process.env.API_URL + `search/games/count`
        return axios.post<SearchGamesCountModel>(url, {
            search_string: searchString,
            limit: 1

        })
    }
    static async getUserPosts(username: string, offset: number): Promise<AxiosResponse<PostsResponseModel[]>> {
        const url = process.env.API_URL
        return axios.post<PostsResponseModel[]>(url + `posts/get`, {
            username: username,
            offset: offset
        })
    }

    static async getAuthUserPosts(username: string, offset: number): Promise<AxiosResponse<PostsResponseModel[]>> {
        return $api.post<PostsResponseModel[]>(`/posts/get/auth`, {
            username: username,
            offset: offset
        })
    }

    static async CreateNewPost(id: string, parent_post_id: string | null, text: string): Promise<AxiosResponse> {
        const url = process.env.API_URL + `posts`
        return $api.post(url, {
            id: id,
            parent_post_id: parent_post_id,
            text: text

        })
    }
    static async getPostsCount(username: string): Promise<AxiosResponse<PostsCount>> {
        const url = process.env.API_URL + `posts/count/${username}`
        return $api.get<PostsCount>(url,)
    }

    static async getPostsData(id: string, user_id: string | null): Promise<AxiosResponse<PostsResponseModel>> {
        const url = process.env.API_URL + `posts/post`
        return axios.post<PostsResponseModel>(url,{
            id: id,
            user_id: user_id
        })
    }

}
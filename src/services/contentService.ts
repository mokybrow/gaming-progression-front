import axios, { AxiosResponse } from "axios";
import $api from "@/api/api";
import { CommentsResponse, SearchGamesCountModel, SearchGamesModel, UserCommentsLikes } from "@/models/serviceModel";
import { SearchUserModel } from "@/models/userModel";
import { WallResponseModel } from "@/models/wallsModels";
import { FeedResponseModel } from "@/models/feedsModels";
import { PostCreateResponseModel, PostResponseModel } from "@/models/postsModel";
import { CommentsResponseModel, CommentModel } from "@/models/commentsModels";

export default class ContentService {

    static async addNewComment(itemId: string, text: string, parentCommntId?: string | null): Promise<AxiosResponse<CommentModel>> {
        const url = process.env.API_URL + 'comments'
        return $api.post<CommentModel>(url,
            {
                item_id: itemId,
                parent_comment_id: parentCommntId,
                text: text,
                deleted: false

            }
        )
    }

    static async getComments(itemId: string, userId: string | null): Promise<AxiosResponse<CommentsResponseModel[]>> {
        const url = process.env.API_URL + 'comments'
        return axios.get<CommentsResponseModel[]>(url,
            {
                params: {
                    id: itemId,
                    user_id: userId
                }
            }
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


    static async CreateNewPost(id: string, parentPostId: string | null, text: string): Promise<AxiosResponse<PostCreateResponseModel>> {
        const url = process.env.API_URL + `posts`
        return $api.post<PostCreateResponseModel>(url, {
            id: id,
            parent_post_id: parentPostId,
            text: text

        })
    }


    static async getPostsData(id: string, user_id: string | null): Promise<AxiosResponse<PostResponseModel>> {
        const url = process.env.API_URL + `posts`
        return axios.get<PostResponseModel>(url,
            {
                params: {
                    id: id,
                    user_id: user_id
                }
            }
        )
    }


    static async getUserWall(username: string, user_id: string | null, page: number): Promise<AxiosResponse<WallResponseModel[]>> {
        const url = process.env.API_URL + `walls/get-user-wall`
        return axios.post<WallResponseModel[]>(url, {
            username: username,
            user_id: user_id,
            page: page
        })
    }


    static async getUserFeed(page: number): Promise<AxiosResponse<WallResponseModel[]>> {
        const url = process.env.API_URL
        return $api.get<WallResponseModel[]>(url + `feeds?page=${page}`,)
    }

}
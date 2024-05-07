import axios, { AxiosResponse } from "axios";
import $api from "@/api/api";
import { AuthResponse, IGeneralUserModel, IUserModel, MailingSettingsModel, RegistrResponse } from "@/models/userModel";
import { getLocalToken } from "@/utils/tokenUtils";
import { PostResponseModel } from "@/models/postsModel";
import { PlaylistModel, PlaylistsResponseModel } from "@/models/playlistsModels";

export default class PlaylistsService {

    static async createPlaylist(name: string, about: string | null, isPrivate: boolean): Promise<AxiosResponse> {
        return $api.post('playlists/create', {
            name: name,
            about: about,
            is_private: isPrivate
        }
        )
    }

    static async getPlaylistData(listId: string): Promise<AxiosResponse<PlaylistModel>> {
        const url = process.env.API_URL + `playlists/${listId}`
        return axios.get<PlaylistModel>(url)
    }
    static async addPlaylistsToMy(listId: string): Promise<AxiosResponse> {
        return $api.post(`playlists/${listId}`)
    }

    static async getAllPlaylists(page: number, userId: string | null): Promise<AxiosResponse> {
        const url = process.env.API_URL + `playlists/get/all`

        return axios.post(url, {
            page: page,
            user_id: userId
        })
    }

    static async addGameToPlaylist(listId: string, gameId: string): Promise<AxiosResponse<PlaylistsResponseModel[]>> {
        return $api.post<PlaylistsResponseModel[]>(`playlists/add/game`, {
            list_id: listId,
            game_id: gameId
        })
    }

    static async getUserPlaylistsMe(): Promise<AxiosResponse<PlaylistModel[]>> {
        return $api.get<PlaylistModel[]>(`playlists/user/me`)
    }

    static async getUserPlaylists(username: string, userId: string | null): Promise<AxiosResponse<PlaylistsResponseModel[]>> {
        const url = process.env.API_URL + `playlists/user/get`

        return axios.post<PlaylistsResponseModel[]>(url,
            {
                username: username,
                user_id: userId
            }
        )
    }
}
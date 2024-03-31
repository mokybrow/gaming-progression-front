import { API_URL } from "@/api/api";
import { AuthResponse, IGeneralUserModel, IUserModel, UserActivity } from "@/models/userModel";
import AuthService from "@/services/authService";
import ContentService from "@/services/contentService";
import GameService from "@/services/gamesService";
import { removeLocalToken, saveLocalToken } from "@/utils/tokenUtils";
import { AxiosError, AxiosResponse } from "axios";
import { makeAutoObservable } from "mobx";



export default class AuthStore {
    user = {} as IUserModel;
    anotherUsers = {} as IGeneralUserModel;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUserModel) {
        this.user = user;
    }
    setAnotherUser(user: IGeneralUserModel) {
        this.anotherUsers = user;
    }


    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(response: AxiosResponse<AuthResponse, any>) {
        try {
            // const response = await AuthService.login(username, password);
            saveLocalToken(response.data.access_token);
            this.setAuth(true);
            const userProfile = await AuthService.getProfile();
            this.setUser(userProfile.data);

        } catch (e) {
            const error = e as AxiosError;
            return error
        }
    }


    async logout() {
        try {
            removeLocalToken();
            this.setAuth(false);
            this.setUser({} as IUserModel);

        } catch (e) {
        }
    }

    async checkAuth(username?: string) {
        this.setLoading(true);
        try {
            const response = await AuthService.getProfile();
            this.setUser(response.data)
            this.setAuth(true);
            this.setLoading(false);

        } catch (error) {
            this.setUser({} as IUserModel)
            removeLocalToken();
        }
        try {
            if (username !== undefined) {
                if (username != this.user.username) {
                    const response = await AuthService.getUser(String(username));
                    this.setAnotherUser(response.data)
                }
            }
        } catch (error) {

        }
    }

    async changeGameStatus(gameId: string, activityType: string) {
        this.setLoading(true);
        try {
            await GameService.changeGameStatus(gameId, activityType);
            const response = await AuthService.getProfile();
            this.setUser(response.data)
            this.setAuth(true);

            this.setLoading(false);
        } catch (error) {
            this.setUser({} as IUserModel)
            removeLocalToken();
        }
    }

    async addGameToFavorite(gameId: string) {
        this.setLoading(true);
        try {
            await GameService.addGameToFavorite(gameId);
            const response = await AuthService.getProfile();
            this.setUser(response.data)
            this.setAuth(true);

            this.setLoading(false);

        } catch (error) {
            this.setUser({} as IUserModel)
            removeLocalToken();
        }
    }


    async getUsers(username: string) {
        this.setLoading(true);
        try {
            const response = await AuthService.getUser(username);
            this.setAnotherUser(response.data)


            this.setLoading(false);

        } catch (error) {
            this.setAnotherUser({} as IGeneralUserModel)
        }
    }


}
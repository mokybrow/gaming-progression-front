import { API_URL } from "@/api/api";
import { AuthResponse, IUserModel, UserActivity } from "@/models/userModel";
import AuthService from "@/services/authService";
import ContentService from "@/services/contentService";
import GameService from "@/services/gamesService";
import { removeLocalToken, saveLocalToken } from "@/utils/tokenUtils";
import { AxiosError, AxiosResponse } from "axios";
import { makeAutoObservable } from "mobx";



export default class AuthStore {
    user = {} as IUserModel;
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

    async checkAuth() {
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



}
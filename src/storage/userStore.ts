import { API_URL } from "@/api/api";
import { AuthResponse, IGeneralUserModel, IUserModel, MailingSettingsModel, UserActivity } from "@/models/userModel";
import AuthService from "@/services/authService";
import ContentService from "@/services/contentService";
import GameService from "@/services/gamesService";
import UserService from "@/services/userService";
import { removeLocalToken, saveLocalToken } from "@/utils/tokenUtils";
import { AxiosError, AxiosResponse } from "axios";
import { makeAutoObservable } from "mobx";



export default class UserStore {
    user = {} as IGeneralUserModel;

    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }


    setUser(user: IGeneralUserModel) {
        this.user = user;
    }


    setLoading(bool: boolean) {
        this.isLoading = bool;
    }



    async getUserProfile(username: string) {
        this.setLoading(true);
        try {
            const user = await UserService.getUserProfile(username)
            this.setUser(user.data)
            this.setLoading(false)
        }

        catch (error) {
        }
    }


}
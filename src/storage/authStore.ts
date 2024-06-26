import { API_URL } from "@/api/api";
import { FeedResponseModel } from "@/models/feedsModels";
import { AuthResponse, IGeneralUserModel, IUserModel, MailingSettingsModel, UserActivity } from "@/models/userModel";
import AuthService from "@/services/authService";
import ContentService from "@/services/contentService";
import GameService from "@/services/gamesService";
import { removeLocalToken, saveLocalToken } from "@/utils/tokenUtils";
import { AxiosError, AxiosResponse } from "axios";
import { makeAutoObservable } from "mobx";



export default class AuthStore {
    user = {} as IUserModel;
    mailingSettings = [] as MailingSettingsModel[];
    totalPostCount = 0
    isAuth = false;
    isLoading = false;
    offset = 10
    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUserModel) {
        this.user = user;
    }


    setMailingSettings(mailings: MailingSettingsModel[]) {
        this.mailingSettings = mailings;
    }



    setTotalPostCount(count: number) {
        this.totalPostCount = count;
    }



    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    incrementOffset() {
        this.offset += 10;
    }



    async login(username: string, password: string) {
        try {
            const response = await AuthService.login(username, password);
            saveLocalToken(response.data.access_token);
            this.setAuth(true);
            const userProfile = await AuthService.getProfile();
            this.setUser(userProfile.data);
            return response

        } catch (e) {
            const error = e as AxiosError;
            return false
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

  

    async changeGameStatus(gameId: string, activityType: string) {
        this.setLoading(true);
        try {
            await GameService.changeGameStatus(gameId, activityType);
            const response = await AuthService.getProfile();
            this.setUser(response.data)
            this.setAuth(true);

            this.setLoading(false);
        } catch (error) {
      
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
   
        }
    }

  
     async checkAuth() {
        this.setLoading(true);
        try {
            const response = await AuthService.getProfile();
            this.setUser(response.data)
            this.setAuth(true)
            this.setLoading(false);

        } catch (error) {
            this.setUser({} as IUserModel)
            this.setAuth(false)
        }
    }


    async followOnUser(user_id: string) {
        this.setLoading(true);
        try {
            await AuthService.followOnUser(user_id)
            this.setLoading(false)
        }

        catch (error) {
        }
    }

    async getMailingSettings() {
        this.setLoading(true);
        try {
            const response = await AuthService.getMailingSettings()
            this.setMailingSettings(response.data)
            this.setLoading(false)
        }

        catch (error) {
        }
    }

    async updateMailingSettings(mailing_type: string[]) {
        this.setLoading(true);
        try {
            await AuthService.updateMailingSettings(mailing_type)
            const response = await AuthService.getMailingSettings()
            this.setMailingSettings(response.data)
            this.setLoading(false)
        }

        catch (error) {
        }
    }

    async patchMe(fullName?: string | null, biography?: string | null, birthdate?: string | null) {
        this.setLoading(true);
        try {
            await AuthService.PatchMe(fullName, biography, birthdate)
            const response = await AuthService.getProfile();
            this.setUser(response.data)
            this.setAuth(true);

            this.setLoading(false);
        }

        catch (error) {
        }
    }



    async changePasswordRequest() {
        this.setLoading(true);
        try {
            await AuthService.changePasswordRequest()
            this.setLoading(false);
            return true
        }

        catch (error) {
            return false
        }
    }

    async passwordRecovery(email: string) {
        this.setLoading(true);
        try {
            await AuthService.passwordRecovery(email)
            this.setLoading(false);
            return true
        }

        catch (error) {
            return false
        }
    }

}
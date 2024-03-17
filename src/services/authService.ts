import axios, { AxiosResponse } from "axios";
import $api from "@/api/api";
import { AuthResponse, IUserModel, RegistrResponse } from "@/models/userModel";

export default class AuthService {

    static async login(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        const formData = new FormData();
        formData.set('username', username);
        formData.set('password', password);
        return $api.post<AuthResponse>('auth/sign-in', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
    }

    static async registration(username: string, email: string, password: string): Promise<AxiosResponse<RegistrResponse>> {
        const formData = new FormData();
        formData.set('username', username);
        formData.set('password', password);
        return axios.post('http://0.0.0.0:8000/auth/sign-up', {
            username: username,
            email: email,
            full_name: null,
            disabled: false,
            password: password
        })
    }


    static async getProfile(): Promise<AxiosResponse<IUserModel>> {
        return $api.get<IUserModel>(`/auth/users/me`)
    }


}
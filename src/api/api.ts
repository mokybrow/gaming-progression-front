import { getLocalToken } from "@/utils/tokenUtils";
import axios from "axios";

export const API_URL = process.env.API_URL


const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${getLocalToken()}`
    config.headers
    return config;
})

export default $api;
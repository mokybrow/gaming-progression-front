import axios, { AxiosResponse } from "axios";
import $api from "@/api/api";


export default class ReportService {

    static async CreateNewReport(type: string, contentId: string, contentType: string, description: string | null): Promise<AxiosResponse> {
        const url = process.env.API_URL + `reports`
        return $api.post(url, {
            type: type,
            content_id: contentId,
            content_type: contentType,
            description: description,
        })
    }


}
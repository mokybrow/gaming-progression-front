import axios, { AxiosResponse } from "axios";
import $api from "@/api/api";
import { CommentsResponse } from "@/models/serviceModel";

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


}
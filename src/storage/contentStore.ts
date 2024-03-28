import { SearchUserModel } from "@/models/userModel";
import ContentService from "@/services/contentService";
import { makeAutoObservable } from "mobx"


export default class ContentStore {
    users = [] as SearchUserModel[];
    isLoading = false;

    comment = '' as string;
    constructor() {
        makeAutoObservable(this);
    }

    setSearchUsers(users: SearchUserModel[]) {
        this.users = users;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setComment(comment: string) {
        this.comment = comment;
    }

    async searchUser(value: string) {
        this.setLoading(true);

        try {

            const result = await ContentService.SearchUser(value)
            this.setSearchUsers(result.data)
            this.setLoading(false);


        } catch (error) {

        }
    }


}


import { API_URL } from "@/api/api";
import { PostsCount, PostsResponseModel } from "@/models/postsModel";
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
    userPosts = [] as PostsResponseModel[];
    isAuth = false;
    isLoading = false;
    offset = 10
    postsCount = {} as PostsCount
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

    setUserPosts(posts: PostsResponseModel[]) {
        this.userPosts = posts;
    }

    setPostsCount(posts: PostsCount) {
        this.postsCount = posts;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    incrementOffset() {
        this.offset += 10;
    }

    setPostsLikeDecrease(PostID: string) {
        this.userPosts.forEach(function (obj) {
            if (obj.Posts.id === PostID) {
                obj.Posts.like_count -= 1
            }
        });
        this.userPosts.forEach(function (has) {
            if (has.Posts.id === PostID) {
                has.hasAuthorLike = 0
            }
        });
    }

    setPostsLikeIncrease(PostID: string) {
        this.userPosts.forEach(function (obj) {
            if (obj.Posts.id === PostID) {
                obj.Posts.like_count += 1

            }
        });
        this.userPosts.forEach(function (has) {
            if (has.Posts.id === PostID) {
                has.hasAuthorLike = 1
            }
        });

    }

    async login(response: AxiosResponse<AuthResponse, any>) {
        try {
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
                if (!this.isAuth) {
                    const result = await ContentService.getUserPosts(String(username), this.offset)
                    this.setUserPosts(result.data)
                    const count = await ContentService.getPostsCount(String(username))
                    this.setPostsCount(count.data)
                }
                if (this.isAuth) {
                    const result = await ContentService.getAuthUserPosts(String(username), this.offset)
                    this.setUserPosts(result.data)
                    const count = await ContentService.getPostsCount(String(username))
                    this.setPostsCount(count.data)
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

    async createNewPost(id: string, parent_post_id: string | null, text: string, username: string) {
        this.setLoading(true);
        try {
            await ContentService.CreateNewPost(id, parent_post_id, text);
            if (username == this.user.username) {
                const result = await ContentService.getAuthUserPosts(this.user.username, this.offset)
                this.setUserPosts(result.data)
                const count = await ContentService.getPostsCount(String(this.user.username))
                this.setPostsCount(count.data)
            }
            this.setLoading(false);

        } catch (error) {
        }
    }

    async postsOffset(username: string) {
        this.setLoading(true);
        try {
            if (username !== undefined) {

                if (!this.isAuth) {
                    const result = await ContentService.getUserPosts(String(username), this.offset)
                    this.setUserPosts(result.data)
                }
                if (this.isAuth) {
                    const result = await ContentService.getAuthUserPosts(String(username), this.offset)
                    this.setUserPosts(result.data)
                }
            }

        } catch (error) {
        }
    }


    async getPostsCount(username: string) {
        this.setLoading(true);
        try {
            if (username !== undefined) {

                if (!this.isAuth) {
                    const result = await ContentService.getPostsCount(String(username))
                    this.setPostsCount(result.data)
                }
                if (this.isAuth) {
                    const result = await ContentService.getPostsCount(String(username))
                    this.setPostsCount(result.data)
                }
            }

        } catch (error) {
        }
    }

    async followOnUser(user_id: string) {
        this.setLoading(true);
        try {
            await AuthService.followOnUser(user_id)
        }

        catch (error) {
        }
    }

}
import { CommentsResponseModel, CommentModel } from "@/models/commentsModels";
import { PostResponseModel } from "@/models/postsModel";
import { CommentsResponse, UserCommentsLikes } from "@/models/serviceModel";
import { SearchUserModel } from "@/models/userModel";
import { WallResponseModel } from "@/models/wallsModels";
import AuthService from "@/services/authService";
import ContentService from "@/services/contentService";
import { makeAutoObservable } from "mobx"




export default class ContentStore {
    users = [] as SearchUserModel[];
    isLoading = false;
    post = {} as PostResponseModel;

    comments = [] as CommentsResponseModel[];
    commentLikes = [] as UserCommentsLikes[];
    totalPostCount = 0

  
    // Пользовательская стена или лента новостей


    userWall = [] as WallResponseModel[];

    constructor() {
        makeAutoObservable(this);
    }


    setUserWall(wall: WallResponseModel[]) {
        this.userWall = wall;
    }

    setSearchUsers(users: SearchUserModel[]) {
        this.users = users;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }


    setPost(post: PostResponseModel) {
        this.post = post;
    }
    setComments(comments: CommentsResponseModel[]) {
        this.comments = comments;
    }
    setCommentsLikes(likes: UserCommentsLikes[]) {
        this.commentLikes = likes
    }

    setTotalPostCount(count: number) {
        this.totalPostCount = count;
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

    async likeContent(itemId: string, typeId: string, value: boolean) {
        try {
            await ContentService.likeContent(itemId, typeId, value)

        } catch (error) {

        }
    }

    async getPostData(id: string) {
        this.setLoading(true)
        try {
            const response = await AuthService.getProfile();

            const result = await ContentService.getPostsData(id, response.data.id)
            this.setPost(result.data)

            const comments = await ContentService.getComments(id, response.data.id)
            this.setComments(comments.data)

            const likes = await ContentService.getUserCommentsLikes(id)
            this.setCommentsLikes(likes.data)

            this.setLoading(false)
        } catch (error) {
            const result = await ContentService.getPostsData(id, null)
            this.setPost(result.data)

            const comments = await ContentService.getComments(id, null)
            this.setComments(comments.data)
            this.setLoading(false)

        }


    }

    async addNewComment(itemId: string, text: string, parentCommntId: string | null, user_id: string, username: string, full_name: string | null) {
        try {
            const newComment = await ContentService.addNewComment(itemId, text, parentCommntId)
            if (parentCommntId == null) {

                this.comments.unshift(
                    {

                        id: newComment.data.id,
                        user_id: newComment.data.user_id,
                        item_id: newComment.data.item_id,
                        parent_comment_id: null,
                        created_at: newComment.data.created_at,
                        text: newComment.data.text,
                        likes_count: 0,
                        deleted: newComment.data.deleted,
                        author_data: {
                            id: user_id,
                            username: username,
                            full_name: full_name,
                        },
                        child_comment: []

                    }
                )
            }
            else {
                this.comments.find(function (comm) {
                    if (comm.id === parentCommntId) {
                        comm.child_comment.push(
                            {
                                id: newComment.data.id,
                                user_id: newComment.data.user_id,
                                item_id: newComment.data.item_id,
                                parent_comment_id: null,
                                created_at: newComment.data.created_at,
                                text: newComment.data.text,
                                likes_count: 0,
                                deleted: newComment.data.deleted,
                                author_data: {
                                    id: user_id,
                                    username: username,
                                    full_name: full_name,

                                }

                            }
                        )
                    }
                })
            }
        } catch (error) {

        }
    }

    async getUserWall(username: string, user_id: string | null, page: number) {
        console.log(username, user_id, page)
        try {
            const wall = await ContentService.getUserWall(username, user_id, page)
            this.setUserWall(wall.data)
        } catch (error) {

        }
    }

    async createNewPost(id: string, parentPostId: string | null, text: string, user_id: string, username: string, full_name: string) {
        this.setLoading(true);
        try {
            const postData = await ContentService.CreateNewPost(id, parentPostId, text);
            this.userWall.unshift({
                Posts: {
                    ...postData.data, parent_post_data: null, author_data: {
                        id: user_id,
                        username: username,
                        full_name: full_name
                    },
                }, hasAuthorLike: 0,
            })

            this.setLoading(false);

        } catch (error) {
        }
    }

    async getItemComments(itemId: string, userId: string | null) {
        this.setLoading(true);

        try {
            const response = await ContentService.getComments(itemId, userId)
            this.setComments(response.data)
            this.setLoading(false);

        } catch (error) {

        }
    }

    async getUserFeed(page: number) {
        const response = await ContentService.getUserFeed(page)
        this.setUserWall([...this.userWall, ...response.data])
        this.setLoading(false);
        return response
    }
}


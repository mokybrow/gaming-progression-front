import { PostsResponseModel } from "@/models/postsModel";
import { CommentsResponse, UserCommentsLikes } from "@/models/serviceModel";
import { SearchUserModel } from "@/models/userModel";
import AuthService from "@/services/authService";
import ContentService from "@/services/contentService";
import { makeAutoObservable } from "mobx"


export default class ContentStore {
    users = [] as SearchUserModel[];
    isLoading = false;

    comment = '' as string;
    post = {} as PostsResponseModel;
    comments = [] as CommentsResponse[];
    commentsLikes = [] as UserCommentsLikes[];

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
    setPost(post: PostsResponseModel) {
        this.post = post;
    }
    setComments(comments: CommentsResponse[]) {
        this.comments = comments;
    }
    setCommentsLikes(likes: UserCommentsLikes[]) {
        this.commentsLikes = likes;
    }

    setCommentsLikeIncrease(commentId: string) {
        this.comments.forEach(function (obj) {
            if (obj.id === commentId) {
                obj.like_count += 1

            }
        });
        this.commentsLikes.forEach(function (has) {
            if (has.id === commentId) {
                has.hasAuthorLike = 1
            }
        });
        if (!this.commentsLikes.find((i) => i.id === commentId)) {
            this.commentsLikes.push({ id: commentId, hasAuthorLike: 1 })
        }
    }

    setCommentsLikeDecrease(commentId: string) {
        this.comments.forEach(function (obj) {
            if (obj.id === commentId) {
                obj.like_count -= 1
            }
        });
        this.commentsLikes.forEach(function (has) {
            if (has.id === commentId) {
                has.hasAuthorLike = 0
            }
        });
    }

    setChildCommentsLikeIncrease(commentId: string) {
        this.comments.forEach(function (obj) {
            obj.child_comment.forEach(function (child) {
                if (child.id === commentId) {
                    child.like_count += 1

                }
            })

        });
        this.commentsLikes.forEach(function (has) {
            if (has.id === commentId) {
                has.hasAuthorLike = 1
            }
        });
        if (!this.commentsLikes.find((i) => i.id === commentId)) {
            this.commentsLikes.push({ id: commentId, hasAuthorLike: 1 })
        }
    }
    setChildCommentsLikeDecrease(commentId: string) {
        this.comments.forEach(function (obj) {
            obj.child_comment.forEach(function (child) {
                if (child.id === commentId) {
                    child.like_count -= 1

                }
            })

        });
        this.commentsLikes.forEach(function (has) {
            if (has.id === commentId) {
                has.hasAuthorLike = 0
            }
        });
    }

    setPostsLikeDecrease(PostID: string) {

        if (this.post.Posts.id === PostID) {
            this.post.Posts.like_count -= 1
        }


        if (this.post.Posts.id === PostID) {
            this.post.hasAuthorLike = 0
        }

    }

    setPostsLikeIncrease(PostID: string) {

        if (this.post.Posts.id === PostID) {
            this.post.Posts.like_count += 1

        }

        if (this.post.Posts.id === PostID) {
            this.post.hasAuthorLike = 1
        }

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
        try {
            const response = await AuthService.getProfile();
            const result = await ContentService.getPostsData(id, response.data.id)
            this.setPost(result.data)

        } catch (error) {

        }
        try {
            if (this.post) {

                const result = await ContentService.getPostsData(id, null)
                this.setPost(result.data)
            }

        } catch (error) {

        }
        try {
            const result = await ContentService.getComments(id)
            this.setComments(result.data)
            this.setLoading(false);

        } catch (error) {

        }
        try {
            const likes = await ContentService.getUserCommentsLikes(id)
            this.setCommentsLikes(likes.data)
        } catch (error) {

        }
    }

    async addNewComment(itemId: string, text: string, parentCommntId?: string | null) {
        this.setLoading(true);
        try {
            await ContentService.addNewComment(itemId, text, parentCommntId)
            const result = await ContentService.getComments(itemId)
            this.setComments(result.data)
            this.setLoading(false);

        } catch (error) {

        }
    }
}


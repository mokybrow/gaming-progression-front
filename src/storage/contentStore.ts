import { CommentsResponseModel, CommentModel } from "@/models/commentsModels";
import { GamePageResponse } from "@/models/gamesModel";
import { PostResponseModel } from "@/models/postsModel";
import { CommentsResponse, UserCommentsLikes } from "@/models/serviceModel";
import { SearchUserModel } from "@/models/userModel";
import { WallResponseModel } from "@/models/wallsModels";
import AuthService from "@/services/authService";
import ContentService from "@/services/contentService";
import GameService from "@/services/gamesService";
import { makeAutoObservable } from "mobx"




export default class ContentStore {
    users = [] as SearchUserModel[];
    isLoading = false;
    post = {} as PostResponseModel;

    comments = [] as CommentsResponseModel[];
    commentLikes = [] as UserCommentsLikes[];
    totalPostCount = 0

    // Лента новостей
    userFeed = [] as WallResponseModel[];

    // Пользовательская стена 
    userWall = [] as WallResponseModel[];
    myWall = [] as WallResponseModel[];


    // Страница игры
    gamePage = {} as GamePageResponse;
    rate = 0

    constructor() {
        makeAutoObservable(this);
    }


    setUserWall(wall: WallResponseModel[]) {
        this.userWall = wall;
    }

    setMyWall(wall: WallResponseModel[]) {
        this.myWall = wall;
    }
    setUserFeed(posts: WallResponseModel[]) {
        this.userFeed = posts;
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
    // Game
    setGamePage(games: GamePageResponse) {
        this.gamePage = games;
    }
    setGameRate(rate: number) {
        this.rate = rate;
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


            this.userFeed.forEach(function (obj) {
                if (obj.Posts.id === itemId && obj.hasAuthorLike === 0 && typeId !== '985449ce-ebe9-4214-a161-a6a51e9059bc') {
                    obj.hasAuthorLike = 1
                    obj.Posts.likes_count += 1
                    console.log('Прибавляем в ленте')
                    return;
                }
                if (obj.Posts.id === itemId && obj.hasAuthorLike === 1 && typeId !== '985449ce-ebe9-4214-a161-a6a51e9059bc') {
                    obj.hasAuthorLike = 0
                    obj.Posts.likes_count -= 1
                    console.log('Убавляем в ленте ')
                    return;
                }
                return;

            });
            this.userWall.forEach(function (obj) {
                if (obj.Posts.id === itemId && obj.hasAuthorLike === 0 && typeId !== '985449ce-ebe9-4214-a161-a6a51e9059bc') {
                    obj.hasAuthorLike = 1
                    obj.Posts.likes_count += 1
                    console.log('Прибавляем в ленте')
                    return;
                }
                if (obj.Posts.id === itemId && obj.hasAuthorLike === 1 && typeId !== '985449ce-ebe9-4214-a161-a6a51e9059bc') {
                    obj.hasAuthorLike = 0
                    obj.Posts.likes_count -= 1
                    console.log('Убавляем в ленте ')
                    return;
                }
                return;

            });
            this.myWall.forEach(function (obj) {
                if (obj.Posts.id === itemId && obj.hasAuthorLike === 0 && typeId !== '985449ce-ebe9-4214-a161-a6a51e9059bc') {
                    obj.hasAuthorLike = 1
                    obj.Posts.likes_count += 1
                    console.log('Прибавляем в ленте')
                    return;
                }
                if (obj.Posts.id === itemId && obj.hasAuthorLike === 1 && typeId !== '985449ce-ebe9-4214-a161-a6a51e9059bc') {
                    obj.hasAuthorLike = 0
                    obj.Posts.likes_count -= 1
                    console.log('Убавляем в ленте ')
                    return;
                }
                return;

            });



        } catch (error) {

        }
        try {
            if (this.post.Posts.id == itemId && this.post.hasAuthorLike === 0 && typeId !== '985449ce-ebe9-4214-a161-a6a51e9059bc') {
                this.post.Posts.likes_count += 1
                this.post.hasAuthorLike = 1
                return;

            }
            if (this.post.Posts.id == itemId && this.post.hasAuthorLike === 1 && typeId !== '985449ce-ebe9-4214-a161-a6a51e9059bc') {
                this.post.Posts.likes_count -= 1
                this.post.hasAuthorLike = 0
            }
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

    async getRepostData(id: string) {
        this.setLoading(true)
        try {
            const response = await AuthService.getProfile();
            const result = await ContentService.getPostsData(id, response.data.id)
            this.setPost(result.data)

            this.setLoading(false)
        } catch (error) {
            const result = await ContentService.getPostsData(id, null)
            this.setPost(result.data)
            this.setLoading(false)

        }


    }

    async addNewComment(itemId: string, text: string, parentCommntId: string | null, user_id: string, username: string, full_name: string | null) {
        try {
            const newComment = await ContentService.addNewComment(itemId, text, parentCommntId)

            console.log(parentCommntId)
            if (parentCommntId == null) {
                console.log('Добавляем комментарий к пулу')
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

                console.log('Добавляем комментарий к пулу')

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

            this.userWall.forEach(function (obj) {
                if (obj.Posts.id === itemId) {
                    obj.Posts.comments_count += 1
                }
            })
            this.myWall.forEach(function (obj) {
                if (obj.Posts.id === itemId) {
                    obj.Posts.comments_count += 1
                }
            })
            this.userFeed.forEach(function (obj) {
                if (obj.Posts.id === itemId) {
                    obj.Posts.comments_count += 1
                }
            })

            this.post.Posts.comments_count += 1
        } catch (error) {

        }
    }

    async getUserWall(username: string, page: number) {
        try {
            const user = await AuthService.getProfile();
            if (user.data.username === username) {
                const wall = await ContentService.getUserWall(username, user.data.id, page)
                if (this.myWall.includes( wall.data[0])){
                    console.log('Условие 1')
                    this.setMyWall(wall.data)
                }
                else{
                    console.log('Условие 2')
                    this.setMyWall([...this.myWall, ...wall.data])

                }
                return wall
            }
        } catch (error) {
            const wall = await ContentService.getUserWall(username, null, page)
            this.setUserWall([...this.userWall, ...wall.data])
            return wall
        }
    }

    async createNewPost(id: string, parentPostId: string | null, text: string, user_id: string, username: string, full_name: string) {
        this.setLoading(true);
        try {
            const postData = await ContentService.CreateNewPost(id, parentPostId, text);
            console.log('Добавляем пост')
            if (parentPostId === null) {
                this.myWall.unshift({
                    Posts: {
                        ...postData.data, parent_post_data: null, author_data: {
                            id: user_id,
                            username: username,
                            full_name: full_name
                        },
                    }, hasAuthorLike: 0,
                })
            }
            if (parentPostId !== null) {
                console.log('Добавляем репост')

                var foundObject = this.myWall.filter(function (item) {
                    return item.Posts.id === parentPostId;
                })[0];
                this.myWall.unshift({
                    Posts: {
                        ...postData.data,
                        parent_post_data: foundObject.Posts, author_data: {
                            id: user_id,
                            username: username,
                            full_name: full_name
                        },
                    }, hasAuthorLike: 0,
                })

            }
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
        this.setUserFeed([...this.userFeed, ...response.data])
        this.setLoading(false);
        return response
    }

    // Эксперимент

    async getGamePage(slug: string) {
        this.setLoading(true);
        try {
            const userId = await AuthService.getProfile()

            const game = await GameService.getGamePage(slug);
            this.setGamePage(game.data)

            const result = await ContentService.getComments(game.data.id, userId.data.id)
            this.setComments(result.data)


            const likes = await ContentService.getUserCommentsLikes(this.gamePage.id)
            this.setCommentsLikes(likes.data)

        } catch {
            const game = await GameService.getGamePage(slug);
            this.setGamePage(game.data)

            const result = await ContentService.getComments(game.data.id, null)
            this.setComments(result.data)
        }
        finally {
            this.setLoading(false);

        }

    }
}


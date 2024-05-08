import { CommentsResponseModel, CommentModel } from "@/models/commentsModels";
import { GamePageResponse } from "@/models/gamesModel";
import { PlaylistModel, PlaylistsResponseModel } from "@/models/playlistsModels";
import { PostResponseModel } from "@/models/postsModel";
import { CommentsResponse, UserCommentsLikes } from "@/models/serviceModel";
import { SearchUserModel } from "@/models/userModel";
import { WallResponseModel } from "@/models/wallsModels";
import AuthService from "@/services/authService";
import ContentService from "@/services/contentService";
import GameService from "@/services/gamesService";
import PlaylistsService from "@/services/playlistsService";
import { AxiosError } from "axios";
import { makeAutoObservable } from "mobx"




export default class ContentStore {
    users = [] as SearchUserModel[];
    isLoading = false;
    post = {} as PostResponseModel;

    comments = [] as CommentsResponseModel[];
    commentLikes = [] as UserCommentsLikes[];
    totalPostCountMe = 0
    totalPostCount = 0
    totalPlaylistsCount = 0

    // Лента новостей
    userFeed = [] as WallResponseModel[];

    // Пользовательская стена 
    userWall = [] as WallResponseModel[];
    myWall = [] as WallResponseModel[];
    myPage = 10
    userPage = 10
    feedPage = 10
    playlistPage = 20

    // Страница игры
    gamePage = {} as GamePageResponse;
    rate = 0

    // Плейлисты
    pagePlaylists = [] as PlaylistsResponseModel[]
    myPlaylists = [] as PlaylistModel[]
    userPlaylists = [] as PlaylistsResponseModel[]
    playlistData = {} as PlaylistModel

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

    setPagePlaylists(playlists: PlaylistsResponseModel[]) {
        this.pagePlaylists = playlists;
    }

    setMyPlaylists(playlists: PlaylistModel[]) {
        this.myPlaylists = playlists;
    }


    setUserPlaylists(playlists: PlaylistsResponseModel[]) {
        this.userPlaylists = playlists;
    }

    setPlaylistData(playlist: PlaylistModel) {
        this.playlistData = playlist;
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
    setTotalPostCountMe(count: number) {
        this.totalPostCountMe = count;
    }
    setTotalPlaylistsCount(count: number) {
        this.totalPlaylistsCount = count;
    }
    //Счётчик страниц для ленты
    setMyPage(count: number) {
        this.myPage = count;
    }
    setUserPage(count: number) {
        this.userPage = count;
    }
    setFeedPage(count: number) {
        this.feedPage = count;
    }
    setPlaylistPage(count: number) {
        this.feedPage = count;
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
                    return;
                }
                if (obj.Posts.id === itemId && obj.hasAuthorLike === 1 && typeId !== '985449ce-ebe9-4214-a161-a6a51e9059bc') {
                    obj.hasAuthorLike = 0
                    obj.Posts.likes_count -= 1
                    return;
                }
                return;

            });
            this.userWall.forEach(function (obj) {
                if (obj.Posts.id === itemId && obj.hasAuthorLike === 0 && typeId !== '985449ce-ebe9-4214-a161-a6a51e9059bc') {
                    obj.hasAuthorLike = 1
                    obj.Posts.likes_count += 1
                    return;
                }
                if (obj.Posts.id === itemId && obj.hasAuthorLike === 1 && typeId !== '985449ce-ebe9-4214-a161-a6a51e9059bc') {
                    obj.hasAuthorLike = 0
                    obj.Posts.likes_count -= 1
                    return;
                }
                return;

            });
            this.myWall.forEach(function (obj) {
                if (obj.Posts.id === itemId && obj.hasAuthorLike === 0 && typeId !== '985449ce-ebe9-4214-a161-a6a51e9059bc') {
                    obj.hasAuthorLike = 1
                    obj.Posts.likes_count += 1
                    return;
                }
                if (obj.Posts.id === itemId && obj.hasAuthorLike === 1 && typeId !== '985449ce-ebe9-4214-a161-a6a51e9059bc') {
                    obj.hasAuthorLike = 0
                    obj.Posts.likes_count -= 1
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

    async getUserWall(username: string, page: number, authUsername: string | null, userId: string | null) {
        try {
            console.log(username, page, authUsername, userId)
            if (authUsername === username && authUsername !== null) {
                const wall = await ContentService.getUserWall(username, userId, page)
                this.setMyWall(wall.data)
                this.setTotalPostCountMe(wall.headers['x-post-count'])
                return wall
            }
            else if (authUsername !== null && userId !== null) {
                const wall = await ContentService.getUserWall(username, userId, page)
                this.setUserWall(wall.data)
                this.setTotalPostCount(wall.headers['x-post-count'])
                return wall
            } else {

                const wall = await ContentService.getUserWall(username, null, page)
                this.setUserWall(wall.data)
                this.setTotalPostCount(wall.headers['x-post-count'])
                return wall

            }
        } catch (error) {
            this.setUserWall([])
            this.setTotalPostCount(0)
        }
    }
    async getUserWallScroll(username: string, page: number, authUsername: string | null, userId: string | null) {
        try {

            if (authUsername === username && authUsername !== null) {
                const wall = await ContentService.getUserWall(username, userId, page)
                this.setMyWall([...this.myWall, ...wall.data])
                this.setTotalPostCountMe(wall.headers['x-post-count'])
                return wall
            }
            else if (authUsername !== null && userId !== null && userId !== undefined && authUsername !== undefined) {
                const wall = await ContentService.getUserWall(username, userId, page)
                this.setUserWall([...this.userWall, ...wall.data])
                this.setTotalPostCount(wall.headers['x-post-count'])
                return wall
            }
            else {
                const wall = await ContentService.getUserWall(username, null, page)
                this.setUserWall([...this.userWall, ...wall.data])
                this.setTotalPostCount(wall.headers['x-post-count'])
                return wall
            }
        } catch (error) {

        }
    }

    async createNewPost(id: string, parentPostId: string | null, text: string, user_id: string, username: string, full_name: string) {
        this.setLoading(true);
        try {
            const postData = await ContentService.CreateNewPost(id, parentPostId, text);
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
        this.setUserFeed(response.data)
        this.setLoading(false);
        return response
    }

    async getUserFeedSCroll(page: number) {
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

            const rate = await ContentService.getUserGameRate(this.gamePage.id)
            this.setGameRate(rate.data)

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

    async getPlaylists(page: number) {
        try {
            const user = await AuthService.getProfile();

            const playlists = await PlaylistsService.getAllPlaylists(page, user.data.id)
            this.setPagePlaylists(playlists.data)

            return playlists

        } catch (error) {
            const playlists = await PlaylistsService.getAllPlaylists(page, null)
            this.setPagePlaylists(playlists.data)

            return playlists
        }
    }
    async getPlaylistsScroll(page: number) {
        try {
            const user = await AuthService.getProfile();

            const playlists = await PlaylistsService.getAllPlaylists(page, user.data.id)
            this.setPagePlaylists([...this.myPlaylists, ...playlists.data])

            return playlists

        } catch (error) {
            const playlists = await PlaylistsService.getAllPlaylists(page, null)
            this.setPagePlaylists([...this.myPlaylists, ...playlists.data])

            return playlists
        }
    }

    async addPlaylistToCollection(listId: string) {
        try {
            await PlaylistsService.addPlaylistsToMy(listId)
            this.pagePlaylists.forEach(function (item) {
                if (item.addedPlaylist === 1 && item.Playlists.id === listId) {
                    item.addedPlaylist = 0
                    return
                }
                if (item.addedPlaylist === 0 && item.Playlists.id === listId) {
                    item.addedPlaylist = 1
                }
            })
            if (this.myPlaylists.some(item => item.id == listId)) {
                const index = this.myPlaylists.findIndex(n => n.id === listId )
                if (index !== -1) {
                    this.myPlaylists.splice(index, 1);
                    return
                }
            }
            else {

                this.myPlaylists.push(
                    {
                        id: this.playlistData.id,
                        owner_id: this.playlistData.owner_id,
                        name: this.playlistData.name,
                        about: this.playlistData.about,
                        created_at: this.playlistData.created_at,
                        owner_data: this.playlistData.owner_data,
                        list_games: this.playlistData.list_games
                    }
                )
            }


        } catch (error) {

        }
    }

    async createPlaylist(listName: string, listDescription: string | null, listPrivacy: boolean) {
        try {
            const result = await PlaylistsService.createPlaylist(listName, listDescription, listPrivacy)
            return result
        } catch (e) {

            const error = e as AxiosError;
            return false
        }
    }

    async getPlaylistData(listId: string) {
        try {
            const result = await PlaylistsService.getPlaylistData(listId)
            this.setPlaylistData(result.data)
            return result
        } catch (e) {

            const error = e as AxiosError;
            return false
        }
    }

    async removeGameFormPlaylist(listId: string, gameId: string) {
        try {
            await PlaylistsService.addGameToPlaylist(listId, gameId)
            const index = this.playlistData.list_games.findIndex(n => n.game_data.id === gameId && this.playlistData.id === listId)
            if (index !== -1) {
                this.playlistData.list_games.splice(index, 1);
            }

        } catch (e) {

            const error = e as AxiosError;
            return false
        }
    }

    async getUserPlaylistsMe() {
        try {
            const response = await PlaylistsService.getUserPlaylistsMe()
            this.setMyPlaylists(response.data)

        } catch (e) {
            this.setMyPlaylists([])
            const error = e as AxiosError;
            return false
        }
    }

    async getUserPlaylists(username: string, userId: string | null) {
        try {
            const response = await PlaylistsService.getUserPlaylists(username, userId)
            this.setUserPlaylists(response.data)

        } catch (e) {
            this.setUserPlaylists([])
            const error = e as AxiosError;
            return false
        }
    }
}


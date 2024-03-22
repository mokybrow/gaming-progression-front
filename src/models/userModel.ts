export interface AuthResponse {
    access_token: string
    token_type: string
}

export interface RegistrResponse {
    detail: string
}

export interface IUserModel  {
    username: string
    email: string
    full_name: string
    disabled: boolean
    id: string
    is_verified: boolean
    is_superuser: boolean
    is_moderator: boolean
    user_activity: UserActivity[]
    user_favorite: UserFavorite[]
    followers: Follower[]
    subscriptions: Subscription[]
    lists: List[]
    created_at: Date
    biography?: string
}

export interface UserActivity {
	game_data: GameData
	activity_data: ActivityData
}

export interface GameData {
	id: string
	title: string
	description: string
	release_date: string
	cover: string
}

export interface ActivityData {
	id: string
	name: string
	code: number
}

export interface UserFavorite {
	game_data: GameData2
}

export interface GameData2 {
	id: string
	title: string
	description: string
	release_date: string
	cover: string
}

export interface Follower {
	follower_data: FollowerData
}

export interface FollowerData {
	id: string
	username: string
	full_name: string
}

export interface Subscription {
	sub_data: SubData
}

export interface SubData {
	id: string
	username: string
	full_name: string
}

export interface List {
	playlists: Playlists
}

export interface Playlists {
	id: string
	owner_id: string
	name: string
	about: string
	is_private: boolean
	created_at: string
}



export interface SearchUserModel {
	id: string,
    username: string,
    full_name: string,
}
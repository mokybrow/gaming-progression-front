export interface AuthResponse {
	access_token: string
	token_type: string
}

export interface RegistrResponse {
	detail: string
}


export interface IUserModel {
	username: string
	email: string
	full_name: string
	disabled: boolean
	id: string
	is_verified: boolean
	is_superuser: boolean
	is_moderator: boolean
	biography: string
	birthdate: string
	user_activity: UserActivity[]
	user_favorite: UserFavorite[]
	followers: Followers[]
	subscriptions: Subscription[]
	created_at: string
}

export interface IGeneralUserModel {
	id: string
	username: string
	full_name: string
	biography: string
	created_at: string
	user_activity: UserActivity[]
	user_favorite: UserFavorite[]
	followers: Followers[]
	subscriptions: Subscription[]
}


export interface UserActivity {
	game_data: GameData
	activity_data: ActivityData
}

export interface GameData {
	id: string
	title: string
	slug: string
	description: any
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
	slug: string
	description: any
	release_date: string
	cover: string
}

export interface Followers {
	follower_data: SubData
}

export interface Subscription {
	sub_data: SubData
}

export interface SubData {
	id: string
	username: string
	full_name: string
}

	

export interface SearchUserModel {
	id: string,
	username: string,
	full_name: string,
}


// Настройки почты
export interface MailingSettingsModel {
	user_id: string
	type_data: TypeData
}

export interface TypeData {
	id: string
	name: string
	code: number
}

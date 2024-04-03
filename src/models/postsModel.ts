export interface PostsResponseModel {
  Posts: Posts
  commentCount: number
  hasAuthorLike: number | null
}

export interface Posts {
  id: string
  user_id: string
  wall_id: string
  parent_post_id?: string
  text: string
  like_count: number
  disabled: boolean
  created_at: string
  updated_at: string
  parent_post_data?: ParentPostData
  users: Users

}

export interface ParentPostData {
  id: string
  user_id: string
  wall_id: string
  parent_post_id: any
  text: string
  like_count: number
  disabled: boolean
  created_at: string
  updated_at: string
  users: Users

}

export interface Users {
  id: string
  username: string
  full_name: string
  biography: string
  created_at: string
}

export interface PostsCount {
  posts_count: number

}
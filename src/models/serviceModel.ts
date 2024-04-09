export interface CommentsResponse {
  id: string
  user_id: string
  item_id: string
  parent_comment_id: any
  created_at: string
  text: string
  like_count: number
  deleted: boolean
  author_info: AuthorInfo
  child_comment: ChildComment[]
}

export interface AuthorInfo {
  id: string
  username: string
  full_name: string
}

export interface ChildComment {
  id: string
  user_id: string
  item_id: string
  parent_comment_id: string
  created_at: string
  text: string
  like_count: number
  deleted: boolean
  author_info: AuthorInfo2
}

export interface AuthorInfo2 {
  id: string
  username: string
  full_name: string
}



export interface UserCommentsLikes {
  id: string
  hasAuthorLike: number
}


export interface SearchGamesModel {
  id: string
  title: string
  cover: string
  description: any
  slug: string
  release_date: string
}


export interface SearchGamesCountModel {
  game_count: number
}
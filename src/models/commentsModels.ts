
export interface CommentsResponseModel {
  id: string
  user_id: string
  item_id: string
  parent_comment_id: any
  created_at: string
  text: string
  likes_count: number
  deleted: boolean
  author_data: AuthorData
  child_comment: ChildComment[]
}



export interface ChildComment {
  id: string
  user_id: string
  item_id: string
  parent_comment_id: string | null
  created_at: string
  text: string
  likes_count: number
  deleted: boolean
  author_data: AuthorData
}

export interface AuthorData {
    id: string
    username: string
    full_name: string | null
  }



export interface CommentModel {
    id: string
    user_id: string
    item_id: string
    parent_comment_id: string
    text: string
    likes_count: number
    deleted: boolean
    created_at: string

}
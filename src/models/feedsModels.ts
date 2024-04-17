export interface FeedResponseModel {
    Posts: Posts
    hasAuthorLike: number
}

export interface Posts {
    id: string
    user_id: string
    wall_id: string
    parent_post_id: any
    text: string
    likes_count: number
    comments_count: number
    disabled: boolean
    created_at: string
    updated_at: string
    parent_post_data: ParentPostData 
    author_data: AuthorData
}


export interface ParentPostData {
    id: string
    user_id: string
    wall_id: string
    parent_post_id: any
    text: string
    likes_count: number
    comments_count: number
    disabled: boolean
    created_at: string
    updated_at: string
    author_data: AuthorData
}


export interface AuthorData {
    id: string
    username: string
    full_name: string
    biography: any
    created_at: string
}
'use client'
import { Context } from "@/app/providers";

import styles from './comment.module.css'
import { CommentsResponse, UserCommentsLikes } from "@/models/serviceModel";

import CommentItem from "./CommentItem";
import { useContext, useState } from "react";
import { observer } from "mobx-react";


export interface CommentProps {
    postId: string
    comments: CommentsResponse[]
    commentLikes: UserCommentsLikes[]

}


function CommentCard({ comments, commentLikes, postId }: CommentProps) {


    return (

        <div>
            {comments.map(comment => (
                <div key={comment.id} className={styles.coments_wrapper}>

                    <CommentItem
                        postId={postId}
                        commentId={comment.id}
                        parentCommentId={comment.id}

                        fullName={comment.author_info.full_name}
                        username={comment.author_info.username}
                        text={comment.text} likeCount={comment.like_count}
                        created={comment.created_at}
                        hasAuthorLike={commentLikes.find(o => o.id === comment.id && o.hasAuthorLike === 1) ? true : false}
                    />
                    {comment.child_comment.length ?
                        <ul className={styles.tree}>

                            {comment.child_comment.map(childComment => (
                                <li key={childComment.id}>
                                    <span className={styles.tree_label}>
                                        <CommentItem
                                            postId={postId}
                                            commentId={childComment.id}
                                            parentCommentId={comment.id}
                                            fullName={childComment.author_info.full_name}
                                            username={childComment.author_info.username}
                                            text={childComment.text} likeCount={childComment.like_count}
                                            created={childComment.created_at}
                                            hasAuthorLike={commentLikes.find(o => o.id === comment.id && o.hasAuthorLike === 1) ? true : false}

                                        />

                                    </span>
                                </li>
                            ))} </ul> : null}
                </div>
            ))
            }
        </div >
    )

}

export default observer(CommentCard)
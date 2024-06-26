'use client'

import styles from './pannel.module.css'

import LikeIcon from '@/components/icons/like';
import { useContext, useState } from 'react';
import { Context } from '@/app/providers';

import CommentIcon from '@/components/icons/comment';
import RepostIcon from '@/components/icons/repost';
import CommentField from '@/components/fields/comment/CommentField';
import { observer } from 'mobx-react';
import OneCard from '../posts/OneCard';
import RepostPopUp from '@/components/popup/repost/RepostPopUp';


export interface CardProps {
    postId: string
    likeCount: number
    commentCount: number
    hasAuthorLike: number
    setIsShowRepost: any
}

function SocialButtonCard({ postId, likeCount, commentCount, hasAuthorLike, setIsShowRepost }: CardProps) {
    const { content_store } = useContext(Context);

    const [showComment, setShowComment] = useState(false)

    const likeCommentHandler = () => {
        content_store.likeContent(postId, '9cc629c8-898a-4d16-b65e-25d0d37f9633', true)
    }
    const getPostCommentsHandler = (postId: string) => {
        setIsShowRepost(true)
        content_store.getRepostData(postId)

    }
    return (
        <>
   
            <div className={styles.social_pannel_wrapper}>
                <div className={styles.social_pannel_grid}>
                    <div className={styles.action_button} onClick={likeCommentHandler}>
                        <div className={styles.icon_wrapper}>
                            <LikeIcon className={hasAuthorLike === 1   ? "heart-icon liked" : "heart-icon"} />
                        </div>
                        <span>{ likeCount}</span>
                    </div>
                    <div className={styles.action_button} onClick={() => setShowComment(!showComment)}>
                        <div className={styles.icon_wrapper}>
                            <CommentIcon className='general-icon' />
                        </div>
                        <span>{commentCount}</span>
                    </div>
                    <div className={styles.action_button} onClick={() => getPostCommentsHandler(postId)}>
                        <div className={styles.icon_wrapper}>
                            <RepostIcon className='general-icon' />
                        </div>
                    </div>
                </div>
            </div>
            {
                showComment ?
                    <CommentField contentID={postId} uniqueId={postId} parentCommentId={null} setShowComment={setShowComment} />
                    : null
            }
        </>


    )

}

export default observer(SocialButtonCard)
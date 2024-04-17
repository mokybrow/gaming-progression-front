'use client'

import styles from './card.module.css'
import Link from 'next/link';
import { FormattedMessage, FormattedDate } from 'react-intl';
import Image from 'next/image'


import { ParentPostData, PostsResponseModel } from '@/models/postsModel';

import userImage from '@/assets/icons/general/user.png'
import SocialButtonCard from "@/components/cards/social_pannel/SocialPannel";

import { CommentsResponse, UserCommentsLikes } from '@/models/serviceModel';
import CommentCard from '@/components/fields/comment/CommentCard';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';


export interface CardProps {
    post: PostsResponseModel
    comments: CommentsResponse[]
    commentLikes: UserCommentsLikes[]
}

function OneCard({ post, comments, commentLikes }: CardProps) {
    const overlayEl = useRef<HTMLDivElement>(null);
    const [height, setH] = useState(0);

    useEffect(() => {
        if (overlayEl.current !== null) {
            setH(overlayEl.current.style.height)
        }
    }, []);
    
    console.log(height)
    return (

        <div className={styles.card_wrapper} ref={overlayEl}>
            <div className={styles.post_header}>
                <div className={styles.post_data_wrapper}>
                    <div className={styles.post_author_image}>
                        <Image src={userImage} alt={''} width={40} height={40} />
                    </div>
                    <div className={styles.user_data_wrapper}>
                        <Link className={styles.author_name} href={`/${post.Posts?.users?.username}`}>
                            {post.Posts?.users?.full_name ?
                                post.Posts?.users?.full_name : post.Posts?.users?.username}
                        </Link>
                        <div className={styles.post_time_wrapper}>
                            <FormattedDate
                                value={post.Posts?.created_at}
                                year='numeric'
                                month='short'
                                day='numeric' />
                        </div>
                    </div>
                </div>
                <div className={styles.service_wrapper}>
                    <span>Пожаловаться</span>
                </div>
            </div>
            <div>
                {post.Posts?.text}
            </div>
            <SocialButtonCard
                postId={post.Posts?.id}
                likeCount={post.Posts?.like_count}
                commentCount={post.commentCount}
                hasAuthorLike={post.hasAuthorLike == 1 ? true : false}
            />

            <CommentCard postId={post.Posts?.id} comments={comments} commentLikes={commentLikes} />

        </div>


    )

}

export default observer(OneCard)
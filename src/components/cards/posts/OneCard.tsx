'use client'

import styles from './card.module.css'
import Link from 'next/link';
import { FormattedMessage, FormattedDate } from 'react-intl';
import Image from 'next/image'


import { ParentPostData, PostResponseModel } from '@/models/postsModel';

import userImage from '@/assets/icons/general/user.png'
import SocialButtonCard from "@/components/cards/social_pannel/SocialPannel";

import { CommentsResponse, UserCommentsLikes } from '@/models/serviceModel';
import CommentCard from '@/components/cards/comment/CommentCard';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { CommentsResponseModel } from '@/models/commentsModels';
import ReactMarkdown from 'react-markdown';
import CrossIcon from '@/components/icons/cross';


export interface CardProps {
    post: PostResponseModel
    comments: CommentsResponseModel[]
    commentLikes: UserCommentsLikes[]
    setIsShowRepost: any
    setIsShowPost: any

}

function OneCard({ post, comments, commentLikes, setIsShowRepost, setIsShowPost }: CardProps) {

    return (

        <div className={styles.one_card_wrapper}>
            <div className={styles.post_header}>
                <div className={styles.post_data_wrapper}>
                    <div className={styles.post_author_image}>
                        <Image src={userImage} alt={''} width={40} height={40} />
                    </div>
                    <div className={styles.user_data_wrapper}>
                        <Link className={styles.author_name} href={`/${post.Posts?.author_data?.username}`}>
                            {post.Posts?.author_data?.full_name ?
                                post.Posts?.author_data?.full_name : post.Posts?.author_data?.username}
                        </Link>
                        <div className={styles.one_post_time_wrapper}>
                            <FormattedDate
                                value={post.Posts?.created_at}
                                year='numeric'
                                month='short'
                                day='numeric' />
                        </div>
                    </div>
                </div>
                <div className={styles.service_wrapper}>
                </div>
            </div>
            <div>
                <ReactMarkdown>
                    {post.Posts?.text}
                </ReactMarkdown>
            </div>
            {post.Posts?.parent_post_data !== null ?
                <ul className={styles.tree}>
                    <span className={styles.tree_label}>
                        <div className={styles.post_header}>
                            <div className={styles.post_data_wrapper}>
                                <div className={styles.post_author_image}>
                                    <Image src={userImage} alt={''} width={40} height={40} />
                                </div>
                                <div className={styles.user_data_wrapper}>
                                    <Link className={styles.author_name} href={`/${post.Posts?.parent_post_data?.author_data?.username}`}>
                                        {post.Posts?.parent_post_data?.author_data?.full_name ?
                                            post.Posts.parent_post_data?.author_data?.full_name : post.Posts?.author_data?.username}
                                    </Link>
                                    <div className={styles.one_post_time_wrapper}>
                                        <FormattedDate
                                            value={post.Posts?.parent_post_data?.created_at}
                                            year='numeric'
                                            month='short'
                                            day='numeric' />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.service_wrapper}>

                            </div>
                        </div>
                        <div>
                            <div className={styles.markdown_text}>
                                <ReactMarkdown>
                                    {post.Posts?.parent_post_data?.text}
                                </ReactMarkdown>
                            </div>

                        </div>

                    </span>
                </ul> : null}
            <SocialButtonCard
                postId={post.Posts?.id}
                likeCount={post.Posts?.likes_count}
                commentCount={post.Posts?.comments_count}
                hasAuthorLike={post.hasAuthorLike}
                setIsShowRepost={setIsShowRepost} />
            <div className={styles.comments_header}>Комментарии</div>
            {comments.length == 0 ? <>Пока пусто</> : 
            <CommentCard postId={post.Posts?.id} comments={comments} commentLikes={commentLikes} />
            }

        </div>


    )

}

export default observer(OneCard)
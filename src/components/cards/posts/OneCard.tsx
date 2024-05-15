'use client'

import styles from './card.module.css'
import Link from 'next/link';
import Image from 'next/image'


import { ParentPostData, PostResponseModel } from '@/models/postsModel';

import userImage from '@/assets/icons/general/user.png'
import SocialButtonCard from "@/components/cards/social_pannel/SocialPannel";

import { CommentsResponse, UserCommentsLikes } from '@/models/serviceModel';
import CommentCard from '@/components/cards/comment/CommentCard';
import { observer } from 'mobx-react';
import React, { useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import { CommentsResponseModel } from '@/models/commentsModels';
import ReactMarkdown from 'react-markdown';
import CrossIcon from '@/components/icons/cross';
import { Context } from '@/app/providers';
import { formatDate } from '@/services/dateFormat';
import UserIcon from '@/components/icons/user';
import Carousel from '@/components/carousel/Carousel';


export interface CardProps {
    comments: CommentsResponseModel[]
    commentLikes: UserCommentsLikes[]
    setIsShowRepost: any
    setIsShowPost: any

}

function OneCard({ comments, commentLikes, setIsShowRepost, setIsShowPost }: CardProps) {

    const { content_store } = useContext(Context);


    return (
        <>
            {content_store.post ?
                <div className={styles.one_card_wrapper}>
                    <div className={styles.post_header}>
                        <div className={styles.post_data_wrapper}>
                            <div className={styles.post_author_image}>
                                <div className={styles.icon_wrapper}>
                                    <UserIcon className='general-icon' />
                                </div>
                            </div>
                            <div className={styles.user_data_wrapper}>
                                <Link className={styles.author_name} href={`/${content_store.post.Posts?.author_data?.username}`}>
                                    {content_store.post.Posts?.author_data?.full_name ?
                                        content_store.post.Posts?.author_data?.full_name : content_store.post.Posts?.author_data?.username}
                                </Link>
                                <div className={styles.one_post_time_wrapper}>
                                    {formatDate(content_store.post?.Posts?.created_at)}
                                </div>
                            </div>
                        </div>
                        <div className={styles.service_wrapper}>
                            <div className={styles.cross_icon} onClick={() => (setIsShowPost(false))}><CrossIcon className='general-icon' /></div>
                        </div>
                    </div>
                    <div>
                        <ReactMarkdown>
                            {content_store.post.Posts?.text}
                        </ReactMarkdown>
                    </div>
                    {content_store.post?.Posts?.pictures.length > 0 ?
                        <div>
                            <Carousel images={content_store.post?.Posts?.pictures} status={false} />
                        </div>
                        : null}
                    {content_store.post.Posts?.parent_post_data !== null ?
                        <ul className={styles.tree}>
                            <span className={styles.tree_label}>
                                <div className={styles.post_header}>
                                    <div className={styles.post_data_wrapper}>
                                        <div className={styles.post_author_image}>
                                            <div className={styles.icon_wrapper}>
                                                <UserIcon className='general-icon' />
                                            </div>
                                        </div>
                                        <div className={styles.user_data_wrapper}>
                                            <Link className={styles.author_name} href={`/${content_store.post.Posts?.parent_post_data?.author_data?.username}`}>
                                                {content_store.post.Posts?.parent_post_data?.author_data?.full_name ?
                                                    content_store.post.Posts.parent_post_data?.author_data?.full_name : content_store.post.Posts?.author_data?.username}
                                            </Link>

                                            <div className={styles.one_post_time_wrapper}>
                                                {formatDate(content_store.post.Posts?.parent_post_data?.created_at)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.service_wrapper}>

                                    </div>
                                </div>
                                <div>
                                    <div className={styles.markdown_text}>
                                        <ReactMarkdown>
                                            {content_store.post.Posts?.parent_post_data?.text}
                                        </ReactMarkdown>
                                    </div>

                                </div>
                                <div>
                                    {content_store.post.Posts?.parent_post_data.pictures.length > 0 ?
                                        <div>
                                            <Carousel images={content_store.post.Posts?.parent_post_data.pictures} status={false} />
                                        </div>
                                        : null}
                                </div>


                            </span>
                        </ul> : null}
                    <SocialButtonCard
                        postId={content_store.post.Posts?.id}
                        likeCount={content_store.post.Posts?.likes_count}
                        commentCount={content_store.post.Posts?.comments_count}
                        hasAuthorLike={content_store.post.hasAuthorLike}
                        setIsShowRepost={setIsShowRepost} />

                    <div className={styles.comments_header}>Комментарии</div>
                    {!comments.length ? <>Пока пусто</> :
                        <CommentCard postId={content_store.post.Posts?.id} comments={comments} commentLikes={commentLikes} />
                    }

                </div>
                : null}
        </>

    )

}

export default observer(OneCard)
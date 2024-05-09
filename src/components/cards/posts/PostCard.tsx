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
import { WallResponseModel } from '@/models/wallsModels';
import ReportButton from '@/components/buttons/report/ReportButton';
import ReactToast from '@/components/toast/Toast';


export interface CardProps {
    post: WallResponseModel

    setIsShowRepost: any
    setIsShowPost: any

}

function PostCard({ post, setIsShowRepost, setIsShowPost }: CardProps) {

    const { content_store } = useContext(Context);
    const { auth_store } = useContext(Context);
    const [showMoreText, setShowMoreText] = useState<boolean>(false)
    const [toastText, setToastText] = useState<string>('')
    const [active, setActive] = useState(false)

    const getPostCommentsHandler = (postId: string) => {
        setIsShowPost(true)
        content_store.getPostData(postId)

    }

    return (
        <>
            <div key={post.Posts.id} className={styles.card_wrapper}>
                <div className={styles.post_header}>
                    <div className={styles.post_data_wrapper}>
                        <div className={styles.post_author_image}>
                            <div className={styles.icon_wrapper}>
                                <UserIcon className='general-icon' />
                            </div>
                        </div>
                        <div className={styles.user_data_wrapper}>
                            <Link className={styles.author_name} href={`/${post.Posts.author_data.username}`}>
                                {post.Posts.author_data.full_name ?
                                    post.Posts.author_data.full_name : post.Posts.author_data.username}
                            </Link>
                            <div className={styles.post_time_wrapper} onClick={() => getPostCommentsHandler(post.Posts.id)}>

                                {formatDate(post.Posts.created_at)}
                            </div>
                        </div>
                    </div>
                    <div className={styles.service_wrapper}>
                        {auth_store.user.id !== post.Posts.author_data.id ?
                            <ReportButton contentId={post.Posts.id} contentType={'posts'} setToastText={setToastText} setActive={setActive} />
                            : null}
                    </div>
                </div>
                <div>
                    <div className={styles.markdown_text}>
                        {post.Posts.text.length > 200 && !showMoreText ?
                            <>
                                <ReactMarkdown>
                                    {post.Posts.text.slice(0, 200) + '...'}
                                </ReactMarkdown>
                                <div onClick={() => setShowMoreText(true)} className={styles.show_more_button}>Показать ещё</div>
                            </>
                            :
                            <>
                                <ReactMarkdown>
                                    {post.Posts.text}
                                </ReactMarkdown>
                                {post.Posts.text.length > 200 ? 
                                    < div onClick={() => setShowMoreText(false)} className={styles.show_more_button}>Скрыть</div>
                                : null}
                    </>
                        }

                </div>

            </div>
            {post.Posts.parent_post_data != null ?
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
                                    <Link className={styles.author_name} href={`/${post.Posts.parent_post_data.author_data.username}`}>
                                        {post.Posts.parent_post_data.author_data.full_name ?
                                            post.Posts.parent_post_data.author_data.full_name : post.Posts.author_data.username}
                                    </Link>
                                    <div className={styles.post_time_wrapper} onClick={() => getPostCommentsHandler(String(post.Posts.parent_post_id))}>

                                        {formatDate(post.Posts.created_at)}

                                    </div>
                                </div>
                            </div>
                            <div className={styles.service_wrapper}>

                            </div>
                        </div>
                        <div>
                            <div className={styles.markdown_text}>
                                <ReactMarkdown>
                                    {post.Posts.parent_post_data.text}
                                </ReactMarkdown>
                            </div>

                        </div>

                    </span>
                </ul>
                :
                null
            }
            <SocialButtonCard
                postId={post.Posts.id}
                likeCount={post.Posts.likes_count}
                commentCount={post.Posts.comments_count}
                hasAuthorLike={post.hasAuthorLike}
                setIsShowRepost={setIsShowRepost} />

        </div >
            <ReactToast timeout={5000} active={active} setActive={setActive} toastText={toastText} setToastText={setToastText} />

        </>
    )

}

export default observer(PostCard)
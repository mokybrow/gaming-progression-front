'use client'

import styles from './card.module.css'
import Link from 'next/link';
import { FormattedDate } from 'react-intl';
import Image from 'next/image'


import { ParentPostData } from '@/models/postsModel';

import userImage from '@/assets/icons/general/user.png'
import SocialButtonCard from "@/components/cards/social_pannel/SocialPannel";
import { useContext, useState } from 'react';
import { Context } from '@/app/providers';
import OneCard from './OneCard';
import ReactMarkdown from 'react-markdown';
import { observer } from 'mobx-react';
import MakeRepostPopup from '@/components/popup/MakeRepostPopup';
import { WallResponseModel } from '@/models/wallsModels';


export interface CardProps {
    postData: WallResponseModel[]
    setIsShowRepost: any
    isShowRepost: any
}

function Card({ postData, setIsShowRepost, isShowRepost }: CardProps) {
    const { content_store } = useContext(Context);

    const getPostCommentsHandler = (postId: string) => {
        setIsShowRepost(true)
        content_store.getPostData(postId)

    }


    return (
        <>
            {!content_store.isLoading ?
                <MakeRepostPopup active={isShowRepost} setActive={setIsShowRepost}>
                    <OneCard post={content_store.post} comments={content_store.comments} commentLikes={content_store.commentLikes} />
                </MakeRepostPopup>
                : null}
            <div>
                {postData.map(post => (
                    <div key={post.Posts.id} className={styles.card_wrapper}>
                        <div className={styles.post_header}>
                            <div className={styles.post_data_wrapper}>
                                <div className={styles.post_author_image}>
                                    <Image src={userImage} alt={''} width={40} height={40} />
                                </div>
                                <div className={styles.user_data_wrapper}>
                                    <Link className={styles.author_name} href={`/${post.Posts.author_data.username}`}>
                                        {post.Posts.author_data.full_name ?
                                            post.Posts.author_data.full_name : post.Posts.author_data.username}
                                    </Link>
                                    <div className={styles.post_time_wrapper} onClick={() => getPostCommentsHandler(post.Posts.id)}>
                                        <FormattedDate
                                            value={post.Posts.created_at}
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
                            <div className={styles.markdown_text}>
                                <ReactMarkdown>
                                    {post.Posts.text}
                                </ReactMarkdown>
                            </div>

                        </div>
                        {post.Posts.parent_post_data != null ?
                            <ul className={styles.tree}>
                                <span className={styles.tree_label}>
                                    <div className={styles.post_header}>
                                        <div className={styles.post_data_wrapper}>
                                            <div className={styles.post_author_image}>
                                                <Image src={userImage} alt={''} width={40} height={40} />
                                            </div>
                                            <div className={styles.user_data_wrapper}>
                                                <Link className={styles.author_name} href={`/${post.Posts.author_data.username}`}>
                                                    {post.Posts.author_data.full_name ?
                                                        post.Posts.author_data.full_name : post.Posts.author_data.username}
                                                </Link>
                                                <div className={styles.post_time_wrapper} onClick={() => getPostCommentsHandler(post.Posts.id)}>
                                                    <FormattedDate
                                                        value={post.Posts.created_at}
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
                                        <div className={styles.markdown_text}>
                                            <ReactMarkdown>
                                                {post.Posts.text}
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
                            hasAuthorLike={post.hasAuthorLike == 1 ? true : false}
                        />

                    </div>
                ))}

            </div>
        </>
    )

}

export default observer(Card)
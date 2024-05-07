'use client'

import styles from './card.module.css'
import Link from 'next/link';
import Image from 'next/image'

import userImage from '@/assets/icons/general/user.png'
import SocialButtonCard from "@/components/cards/social_pannel/SocialPannel";
import { useContext, useState } from 'react';
import { Context } from '@/app/providers';
import OneCard from './OneCard';
import ReactMarkdown from 'react-markdown';
import { observer } from 'mobx-react';
import { WallResponseModel } from '@/models/wallsModels';
import { PostPopUp } from '@/components/popup/posts/PostPopUp';
import RepostPopUp from '@/components/popup/repost/RepostPopUp';
import RepostCard from './RepostCard';
import LeavePostCard from '../service/LeavePostCard';
import DotsIcon from '@/components/icons/dots';
import { formatDate } from '@/services/dateFormat';
import UserIcon from '@/components/icons/user';



export interface CardProps {
    postData: WallResponseModel[]
    isShowPost: any
    setIsShowPost: any
    setIsShowRepost: any
    isShowRepost: any
}

function Card({ postData, isShowPost, setIsShowPost, setIsShowRepost, isShowRepost }: CardProps) {
    const { content_store } = useContext(Context);
    const getPostCommentsHandler = (postId: string) => {
        setIsShowPost(true)
        content_store.getPostData(postId)

    }

    return (
        <>

            <PostPopUp active={isShowPost} setActive={setIsShowPost}>
                <LeavePostCard setIsShow={setIsShowPost} />
                <OneCard
                    post={content_store.post}
                    comments={content_store.comments}
                    commentLikes={content_store.commentLikes}
                    setIsShowRepost={setIsShowRepost}
                    setIsShowPost={setIsShowPost} />
            </PostPopUp>

            <RepostPopUp active={isShowRepost} setActive={setIsShowRepost}>
                <RepostCard post={content_store.post} setIsShowRepost={setIsShowRepost} />
            </RepostPopUp>

            <div>

                {postData.map(post => (
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
                                {/* <span>Пожаловаться</span> */}
                                <div className={styles.icon_wrapper}>
                                    <DotsIcon className='general-icon-fill' />
                                </div>
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

                    </div>
                ))}

            </div>
        </>
    )

}

export default observer(Card)
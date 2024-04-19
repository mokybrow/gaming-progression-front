'use client'

import styles from './repost.module.css'
import Link from 'next/link';
import { FormattedMessage, FormattedDate } from 'react-intl';
import Image from 'next/image'


import { ParentPostData, PostResponseModel } from '@/models/postsModel';

import userImage from '@/assets/icons/general/user.png'

import { observer } from 'mobx-react';
import ReactMarkdown from 'react-markdown';
import RepostField from '@/components/fields/post/RepostField';
import CrossIcon from '@/components/icons/cross';


export interface CardProps {
    post: PostResponseModel
    setIsShowRepost: any
}

function RepostCard({ post, setIsShowRepost }: CardProps) {

    return (
        <>

            <div className={styles.repost_card_wrapper}>

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
                        <div className={styles.service_wrapper}>
                            <div className={styles.cross_icon} onClick={() => (setIsShowRepost(false))}><CrossIcon className='general-icon' /></div>
                        </div>
                    </div>
                </div>
                <div>
                    <ReactMarkdown>
                        {post.Posts?.text}
                    </ReactMarkdown>

                </div>

                <RepostField parentPostId={post.Posts?.id} setIsShowRepost={setIsShowRepost} />
            </div>

        </>
    )

}

export default observer(RepostCard)
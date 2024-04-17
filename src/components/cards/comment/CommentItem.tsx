'use client'
import { Context } from "@/app/providers";

import { useContext,  useState } from "react";
import styles from './comment.module.css'
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { FormattedDate } from "react-intl";
import userImage from '@/assets/icons/general/user.png'
import Image from 'next/image'
import CommentField from "../../fields/comment/CommentField";
import LikeIcon from "@/components/icons/like";
import { observer } from "mobx-react";


export interface CommentProps {
    postId: string
    commentId: string
    fullName: string | null
    username: string
    text: string
    likeCount: number
    created: string
    hasAuthorLike: boolean
    parentCommentId: string | null
}


function CommentItem({ commentId, fullName, username, text, likeCount, created, hasAuthorLike, parentCommentId, postId }: CommentProps) {

    const { content_store } = useContext(Context);
    const { auth_store } = useContext(Context);
    const [showComment, setShowComment] = useState(false)

    const [active, setActive] = useState(false)

    const changeCommentsLikeValue = (postId: string) => {
        setActive(!active)
        content_store.likeContent(postId, '985449ce-ebe9-4214-a161-a6a51e9059bc', true)
    }

    return (


        <div className={styles.card_wrapper}>
            <div className={styles.comment_header}>
                <div className={styles.post_author_image}>
                    <Image src={userImage} alt={''} width={40} height={40} />
                </div>
                <div className={styles.user_data_wrapper}>
                    <Link className={styles.author_name} href={`/${username}`}>
                        {fullName ?
                            fullName : username}
                    </Link>
                    <div className={styles.comment_time_wrapper}>
                        <FormattedDate
                            value={created}
                            year='numeric'
                            month='short'
                            day='numeric' />
                    </div>
                </div>
            </div>
            <div className={styles.markdown_text}><ReactMarkdown>{text}</ReactMarkdown></div>
            <div className={styles.social_pannel_wrapper}>
                <div className={styles.social_pannel_grid}>
                    <div className={styles.action_button}
                        onClick={() => { changeCommentsLikeValue(commentId)}}>
                        <div className={styles.icon_wrapper}>
                            <LikeIcon className={!hasAuthorLike && active || hasAuthorLike && !active  ? "heart-icon liked" : "heart-icon"} />
                        </div>
                        <div>
                            <span>{hasAuthorLike && active ? likeCount - 1 : !hasAuthorLike && active ? likeCount + 1 : likeCount}</span>

                        </div>
                    </div>
                    <div className={styles.action_button}
                        onClick={() => setShowComment(true)}>
                        Ответить
                    </div>
                </div>
            </div>
            {
                showComment ?
                    <CommentField contentID={postId} parentCommentId={parentCommentId} setShowComment={setShowComment} />
                    : null
            }
        </div>




    )

}

export default observer(CommentItem)
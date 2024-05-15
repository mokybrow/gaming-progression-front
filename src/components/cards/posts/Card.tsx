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
import ReportButton from '@/components/buttons/report/ReportButton';
import ReactToast from '@/components/toast/Toast';
import PostCard from './PostCard';



export interface CardProps {
    postData: WallResponseModel[]
    isShowPost: any
    setIsShowPost: any
    setIsShowRepost: any
    isShowRepost: any
}

function Card({ postData, isShowPost, setIsShowPost, setIsShowRepost, isShowRepost }: CardProps) {
    const { content_store } = useContext(Context);
    const [active, setActive] = useState(false)
    const [toastText, setToastText] = useState<string>('')

    const [showMoreText, setShowMoreText] = useState<boolean>(false)
    const getPostCommentsHandler = (postId: string) => {
        setIsShowPost(true)
        content_store.getPostData(postId)

    }

    return (
        <>

            <PostPopUp active={isShowPost} setActive={setIsShowPost}>
                <LeavePostCard setIsShow={setIsShowPost} />
                {content_store.isLoading ? null :
                    <OneCard
                        comments={content_store.comments}
                        commentLikes={content_store.commentLikes}
                        setIsShowRepost={setIsShowRepost}
                        setIsShowPost={setIsShowPost} />
                }
            </PostPopUp>

            <PostPopUp active={isShowRepost} setActive={setIsShowRepost}>
                <RepostCard post={content_store.post} setIsShowRepost={setIsShowRepost} />
            </PostPopUp>

            <div>

                {postData.map(post => (
                    <div key={post.Posts.id}>

                        <PostCard post={post} setIsShowRepost={setIsShowRepost} setIsShowPost={setIsShowPost} />
                    </div>
                ))}

            </div>

            <ReactToast timeout={5000} active={active} setActive={setActive} toastText={toastText} setToastText={setToastText} />

        </>
    )

}

export default observer(Card)
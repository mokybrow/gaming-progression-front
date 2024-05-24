'use client'

import { useContext, useState } from 'react';
import { Context } from '@/app/providers';
import OneCard from './OneCard';
import { observer } from 'mobx-react';
import { WallResponseModel } from '@/models/wallsModels';
import { PostPopUp } from '@/components/popup/posts/PostPopUp';
import RepostCard from './RepostCard';
import LeavePostCard from '../service/LeavePostCard';
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
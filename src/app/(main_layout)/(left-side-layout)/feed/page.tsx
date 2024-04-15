'use client'

import $api from "@/api/api";
import { Context } from "@/app/providers";
import PostCard from "@/components/cards/post_card/PostCard";
import { PostsResponseModel } from "@/models/postsModel";
import AuthService from "@/services/authService";
import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";

function Feed() {
    const { auth_store } = useContext(Context);


    const [page, setPage] = useState<number>(0)
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        if (fetching) {
            try {
                auth_store.getUserFeed(page).then(resp => {
                    setPage(page + 10)
                    auth_store.setTotalPostCount(resp.headers['x-post-count'])
                }).finally(() => setFetching(false))
            } catch (error) {
                
            }
  
        }


    }, [fetching])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }

    }, [])


    const scrollHandler = (e: any) => {
      
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 
        && auth_store.userPosts.length < auth_store.totalPostCount) {
            setFetching(true)
        }

    }

    return (
        <>
            <main className="content_wrapper" >
                {auth_store.userPosts?.map(item => (
                    <div key={item.Posts.id}>

                        <PostCard text={item.Posts.text} like_count={item.Posts.like_count}
                            created_at={item.Posts.created_at} postId={item.Posts.id}
                            comment_count={item.commentCount} full_name={item.Posts.users.full_name}
                            username={item.Posts.users.username} parentPostData={item.Posts.parent_post_data} />
                    </div>
                ))}
            </main >
            <main className="right_side_wrapper">
            </main >

        </>
    );
}


export default observer(Feed)
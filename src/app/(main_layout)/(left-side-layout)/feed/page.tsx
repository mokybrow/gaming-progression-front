'use client'

import $api from "@/api/api";
import { Context } from "@/app/providers";
import Card from "@/components/cards/posts/Card";
import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";

function Feed() {
    const { auth_store } = useContext(Context);
    const { content_store } = useContext(Context);


    const [page, setPage] = useState<number>(0)
    const [fetching, setFetching] = useState(true)
    const [isShowRepost, setIsShowRepost] = useState(false);

    useEffect(() => {
        if (fetching) {
            try {
                content_store.getUserFeed(page).then(resp => {
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
            && content_store.userWall.length < content_store.totalPostCount
        ) {
            setFetching(true)
        }

    }

    return (
        <>

            <main className="content_wrapper" >

                <Card postData={content_store.userWall} setIsShowRepost={setIsShowRepost} isShowRepost={isShowRepost} />
            </main >
            <main className="right_side_wrapper">
            </main >

        </>
    );
}


export default observer(Feed)
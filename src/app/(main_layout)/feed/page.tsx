'use client'

import { Context } from "@/app/providers";
import Card from "@/components/cards/posts/Card";
import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import styles from './page.module.css'


function Feed() {
    const { content_store } = useContext(Context);
    const { auth_store } = useContext(Context);


    const [page, setPage] = useState<number>(10)
    const [fetching, setFetching] = useState(false)
    const [isShowRepost, setIsShowRepost] = useState(false);
    const [isShowPost, setIsShowPost] = useState(false);


    useEffect(() => {
        if (auth_store.isAuth) {
            if (content_store.userFeed.length < 10) {

                content_store.getUserFeed(0).then(resp => {
                    content_store.setTotalPostCount(resp.headers['x-post-count'])
                }).finally(() => setFetching(false))
            }
        }

    }, [content_store])

    useEffect(() => {
        if (fetching) {
            try {
                if (auth_store.isAuth) {
                    content_store.getUserFeedSCroll(page).then(resp => {
                        setPage(page + 10)
                        content_store.setTotalPostCount(resp.headers['x-post-count'])
                    }).finally(() => setFetching(false))
                }
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
        if (e.target.documentElement.scrollHeight -
            (e.target.documentElement.scrollTop + window.innerHeight) < 100
            && content_store.userFeed.length < content_store.totalPostCount
        ) {

            setFetching(true)
        }

    }

    return (
        <>

            <main className="main_content_wrapper" >
                {auth_store.isAuth ?
                    <Card
                        postData={content_store.userFeed}
                        setIsShowPost={setIsShowPost}
                        isShowRepost={isShowRepost}
                        setIsShowRepost={setIsShowRepost}
                        isShowPost={isShowPost} />
                    :
                    <div className={styles.card_wrapper}>
                        Начните подписываться на пользователей и ваша лента обновится
                    </div>
                }
            </main >
            <main className="right_side_wrapper">
            </main >

        </>
    );
}


export default observer(Feed)
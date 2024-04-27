'use client'

import { Context } from "@/app/providers";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import styles from './page.module.css'
import { observer } from "mobx-react-lite";

import ActivityCard from "@/components/cards/activity_card/ActivityCard";
import FavoriteCard from "@/components/cards/favorite_card/FavoriteCard";
import Card from "@/components/cards/posts/Card";
import AuthService from "@/services/authService";
import UserProfileCard from '@/components/cards/user_profile/UserProfile'
import UserStatsCard from '@/components/cards/user_profile/UserStats'
import PostField from "@/components/fields/post/PostField";

function UserProfile() {

  const pathname = usePathname()

  const { auth_store } = useContext(Context);
  const { content_store } = useContext(Context);
  const { user_store } = useContext(Context);
  const username = pathname.substring(pathname.lastIndexOf('/') + 1)
  const [isShowRepost, setIsShowRepost] = useState(false);
  const [isShowPost, setIsShowPost] = useState(false);

  const [isOwner, setIsOwner] = useState(false)
  const [page, setPage] = useState<number>(0)
  const [fetching, setFetching] = useState(true)

  let tabs = [
    { id: "posts", label: "Посты" },
    { id: "activity", label: "Активность" },
    { id: "favorite", label: "Любимые" },
  ];

  let [activeTab, setActiveTab] = useState(tabs[0].id);


  useEffect(() => {
    console.log('забираем данные')

    if (fetching) {
      try {
        content_store.getUserWall(username, page).then(resp => {
          setPage(page + 10)
          content_store.setTotalPostCount(resp?.headers['x-post-count'])
        }).finally(() => setFetching(false))
      } catch (error) {

      }
    }
    try {
      
      AuthService.getProfile().then(response => response.data.username == username ? setIsOwner(true) : null)
    } catch (error) {
      
    }
    user_store.getUserProfile(username)
  }, [fetching,auth_store, content_store, user_store, username])


  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }

  }, [])

  const scrollHandler = (e: any) => {

    if (e.target.documentElement.scrollHeight -
      (e.target.documentElement.scrollTop + window.innerHeight) < 100
 
    ) {
      if (isOwner && content_store.myWall.length < content_store.totalPostCount){
        setFetching(true)

      }
      if (!isOwner && content_store.userWall.length < content_store.totalPostCount){

        setFetching(true)
      }
    }

  }

  return (
    <>
      <main className="content_wrapper">
        {
          isOwner ?
            <>
              {
                auth_store.isLoading ? null :
                  <UserProfileCard
                    username={auth_store.user.username}
                    fullName={auth_store.user.full_name}
                    biorgaphy={auth_store.user.biography}
                    createdAt={auth_store.user.created_at}
                    activity={auth_store.user.user_activity}
                    favorite={auth_store.user.user_favorite}
                    followersCount={auth_store.user.followers?.length}
                    subscriptionsCount={auth_store.user.subscriptions?.length}
                    isOwner={isOwner} />
              }
            </>
            :
            <>
              {
                user_store.isLoading ? null :
                  <UserProfileCard
                    username={user_store.user.username}
                    fullName={user_store.user.full_name}
                    biorgaphy={user_store.user.biography}
                    createdAt={user_store.user.created_at}
                    activity={user_store.user.user_activity}
                    favorite={user_store.user.user_favorite}
                    followersCount={user_store.user.followers?.length}
                    subscriptionsCount={user_store.user.subscriptions?.length}
                    isOwner={isOwner} isFollow={auth_store.user?.subscriptions?.find((obj) => obj.sub_data.username == username) ? true : false} />
              }
            </>
        }
        {isOwner ?
          <PostField parentPostId={null} />
          : null}
        <div className={styles.user_content_wrapper}>
          <div className={styles.nav_buttons_wrapper}>
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={styles.motion_button}>
                {tab.label}

                {activeTab === tab.id ?
                  <><hr className={styles.menu_underline} /></> : null}
              </div>
            ))}
          </div>
          {activeTab === 'posts' ?
            <>

              <>
                {auth_store.user.username === username ?
                  <>
                    {
                      content_store.myWall?.length > 0 ?
                        <Card
                          postData={content_store.myWall}
                          setIsShowPost={setIsShowPost}
                          isShowRepost={isShowRepost}
                          setIsShowRepost={setIsShowRepost}
                          isShowPost={isShowPost} />
                        :
                        <div className={styles.card_wrapper}>

                          <div className={styles.feed_icon}></div>
                          <span>Здесь пока ничего нет</span>
                        </div>
                    }
                  </>
                  : <>
                    {
                      content_store.userWall?.length > 0 ?
                        <Card
                          postData={content_store.userWall}
                          setIsShowPost={setIsShowPost}
                          isShowRepost={isShowRepost}
                          setIsShowRepost={setIsShowRepost}
                          isShowPost={isShowPost} />
                        :
                        <div className={styles.card_wrapper}>

                          <div className={styles.feed_icon}></div>
                          <span>Здесь пока ничего нет</span>
                        </div>
                    }
                  </>}


              </>

            </>
            : null
          }
          {activeTab === 'activity' ?
            <>
              {isOwner ?
                <>
                  {auth_store.user.user_activity.map(item => (
                    <div key={item.game_data.id}>

                      < ActivityCard title={item.game_data.title} cover={item.game_data.cover}
                        release_date={item.game_data.release_date} slug={item.game_data.slug}
                        description={item.game_data.description} activity_type={item.activity_data.name} />
                    </div>
                  ))
                  }
                </>
                :
                <>

                  {
                    user_store.user.user_activity.map(item => (
                      <div key={item.game_data.id}>

                        < ActivityCard title={item.game_data.title} cover={item.game_data.cover}
                          release_date={item.game_data.release_date} slug={item.game_data.slug}
                          description={item.game_data.description} activity_type={item.activity_data.name} />
                      </div>
                    ))
                  }
                </>
              }
            </>
            : null
          }
          {activeTab === 'favorite' ?
            <>
              {isOwner ?
                <>
                  {auth_store.user.user_favorite.map(item => (
                    <div key={item.game_data.id}>
                      < FavoriteCard title={item.game_data.title} cover={item.game_data.cover}
                        release_date={item.game_data.release_date} slug={item.game_data.slug}
                        description={item.game_data.description} />
                    </div>
                  ))
                  }
                </>
                :
                <>

                  {
                    user_store.user.user_favorite.map(item => (
                      <div key={item.game_data.id}>
                        < FavoriteCard title={item.game_data.title} cover={item.game_data.cover}
                          release_date={item.game_data.release_date} slug={item.game_data.slug}
                          description={item.game_data.description} />
                      </div>
                    ))
                  }
                </>
              }
            </>
            : null
          }
        </div>


      </main >
      <main className="right_side_wrapper">
        <div className={styles.user_stats_desk}>


          {isOwner ?
            <UserStatsCard
              activity={auth_store.user.user_activity}
              favorite={auth_store.user.user_favorite}
            />

            :
            <UserStatsCard
              activity={user_store.user.user_activity}
              favorite={user_store.user.user_favorite}
            />
          }
        </div>
      </main>

    </>
  );
}

export default observer(UserProfile);
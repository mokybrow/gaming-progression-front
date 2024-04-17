'use client'

import { Context } from "@/app/providers";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import styles from './page.module.css'
import { FormattedDate } from 'react-intl';
import { observer } from "mobx-react-lite";
import { Mention } from 'primereact/mention';
import { SearchUserModel } from "@/models/userModel";
import { FunctionalGameButton } from "@/components/buttons/FunctionalGameButton";
import Image from 'next/image'
import userpic from '@/assets/icons/general/userpic.svg'
import ActivityCard from "@/components/cards/activity_card/ActivityCard";
import FavoriteCard from "@/components/cards/favorite_card/FavoriteCard";
import { v4 as uuidv4 } from 'uuid';
import Card from "@/components/cards/posts/Card";
import AuthService from "@/services/authService";
import PostField from "@/components/fields/post/PostField";
import UserProfileCard from '@/components/cards/user_profile/UserProfile'
import UserStatsCard from '@/components/cards/user_profile/UserStats'

function UserProfile() {

  const pathname = usePathname()

  const { auth_store } = useContext(Context);
  const { content_store } = useContext(Context);
  const { user_store } = useContext(Context);
  const username = pathname.substring(pathname.lastIndexOf('/') + 1)
  const [isShowRepost, setIsShowRepost] = useState(false);



  let tabs = [
    { id: "posts", label: "Посты" },
    { id: "activity", label: "Активность" },
    { id: "favorite", label: "Любимые" },
  ];

  let [activeTab, setActiveTab] = useState(tabs[0].id);
  const [isOwner, setIsOwner] = useState(false)
  useEffect(() => {
    AuthService.getProfile().then(function (response) {
      if (response.data.id) {
        content_store.getUserWall(username, response.data.id, 0)

      }
      if (username == response.data.username) {

        setIsOwner(true)
      }
    }).catch(function (response) {
      content_store.getUserWall(username, null, 0)
    })

    user_store.getUserProfile(username)

  }, [auth_store, content_store])




  return (
    <>
      <main className="content_wrapper">
        {
          isOwner ?
            <UserProfileCard
              username={auth_store.user.username}
              fullName={auth_store.user.full_name}
              biorgaphy={auth_store.user.biography}
              createdAt={auth_store.user.created_at}
              activity={auth_store.user.user_activity}
              favorite={auth_store.user.user_favorite}
              followersCount={auth_store.user.followers?.length}
              subscriptionsCount={auth_store.user.subscriptions?.length}
              isOwner={isOwner}  />
            :
            <UserProfileCard
              username={user_store.user.username}
              fullName={user_store.user.full_name}
              biorgaphy={user_store.user.biography}
              createdAt={user_store.user.created_at}
              activity={user_store.user.user_activity}
              favorite={user_store.user.user_favorite}
              followersCount={user_store.user.followers?.length}
              subscriptionsCount={user_store.user.subscriptions?.length}
              isOwner={isOwner} isFollow={auth_store.user?.subscriptions?.find((obj) => obj.sub_data.username == username) ? true :  false} />

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
              {
                content_store.userWall?.length > 0 ?
                  <>
                    <Card postData={content_store.userWall} setIsShowRepost={setIsShowRepost} isShowRepost={isShowRepost} />
                  </>
                  :
                  <div className={styles.card_wrapper}>

                    <div className={styles.feed_icon}></div>
                    <span>Здесь пока ничего нет</span>
                  </div>
              }
            </>
            : null
          }
          {activeTab === 'activity' ?
            <>
              {isOwner ?
                <>
                  {auth_store.user.user_activity.map(item => (
                    < ActivityCard title={item.game_data.title} cover={item.game_data.cover}
                      release_date={item.game_data.release_date} slug={item.game_data.slug}
                      description={item.game_data.description} activity_type={item.activity_data.name} />
                  ))
                  }
                </>
                :
                <>

                  {
                    user_store.user.user_activity.map(item => (
                      < ActivityCard title={item.game_data.title} cover={item.game_data.cover}
                        release_date={item.game_data.release_date} slug={item.game_data.slug}
                        description={item.game_data.description} activity_type={item.activity_data.name} />
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
                    < FavoriteCard title={item.game_data.title} cover={item.game_data.cover}
                      release_date={item.game_data.release_date} slug={item.game_data.slug}
                      description={item.game_data.description} />
                  ))
                  }
                </>
                :
                <>

                  {
                    user_store.user.user_favorite.map(item => (
                      < FavoriteCard title={item.game_data.title} cover={item.game_data.cover}
                        release_date={item.game_data.release_date} slug={item.game_data.slug}
                        description={item.game_data.description} />
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
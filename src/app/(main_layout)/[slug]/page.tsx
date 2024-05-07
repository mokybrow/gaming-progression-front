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
import Link from "next/link";

function UserProfile() {

  const pathname = usePathname()

  const { auth_store } = useContext(Context);
  const { content_store } = useContext(Context);
  const { user_store } = useContext(Context);
  const username = pathname.substring(pathname.lastIndexOf('/') + 1)
  const [isShowRepost, setIsShowRepost] = useState(false);
  const [isShowPost, setIsShowPost] = useState(false);

  const [page, setPage] = useState<number>(10)
  const [fetching, setFetching] = useState(false)

  let tabs = [
    { id: "posts", label: "Посты" },
    { id: "activity", label: "Активность" },
    { id: "favorite", label: "Любимые" },
  ];

  let [activeTab, setActiveTab] = useState(tabs[0].id);

  // useEffect(() => {
  //   if (auth_store.user.username === username) {
  //     if (content_store.myWall.length < 10) {
  //       content_store.getUserWall(username, 0)
  //     }
  //   }

  //   if (user_store.user.username !== username && auth_store.user.username !== username) {
  //     content_store.getUserWall(username, 0)
  //   }
  //   if (user_store.user.username === username) {
  //     if (content_store.userWall.length < 10) {
  //       content_store.getUserWall(username, 0)
  //     }
  //   }

  // }, [auth_store, content_store])

  useEffect(() => {

    if (fetching && activeTab == 'posts') {
      try {
        content_store.getUserWallScroll(username, page, auth_store.user.username, auth_store.user.id).then(resp => {
          setPage(page + 10)

        }).finally(() => setFetching(false))

      } catch (error) {

      }
    }


    if (!fetching) {
      AuthService.getProfile().then(function (response) {
        if (response.data.username === username) {
          content_store.getUserPlaylistsMe()
          if (content_store.myWall.length < 10) {
            content_store.getUserWall(username, 0, response.data.username, response.data.id)
          }
        }
        else {
          try {

            content_store.getUserPlaylists(username, auth_store.user.id)
          } catch (error) {

          }
          finally {
            if (user_store.user.username !== username) {
              content_store.getUserWall(username, 0, response.data.username, response.data.id)
            }
            if (user_store.user.username === username) {
              if (content_store.userWall.length < 10) {
                content_store.getUserWall(username, 0, response.data.username, response.data.id)
              }
            }
            user_store.getUserProfile(username)

          }
        }
      }
      ).catch(function () {
        content_store.getUserPlaylists(username, null)
        if (user_store.user.username !== username) {
          content_store.getUserWall(username, 0, null, null)
        }
        if (user_store.user.username === username) {
          if (content_store.userWall.length < 10) {
            content_store.getUserWall(username, 0, null, null)
          }
        }
        user_store.getUserProfile(username)
      }
      )

    }



  }, [fetching, auth_store, content_store, user_store, username])


  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }

  }, [])

  const scrollHandler = (e: any) => {
    if (e.target.documentElement.scrollHeight -
      (e.target.documentElement.scrollTop + window.innerHeight) < 200

    ) {
      if (auth_store.user.username === username && content_store.myWall.length < content_store.totalPostCountMe) {
        setFetching(true)
      }
      if (auth_store.user.username !== username && content_store.userWall.length < content_store.totalPostCount) {
        setFetching(true)
      }
    }

  }

  return (
    <>
      <main className="main_content_wrapper">
        {
          auth_store.user.username === username ?
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
                    isOwner={auth_store.user.username === username} />
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
                    isOwner={auth_store.user.username === username}
                    isFollow={auth_store.user?.subscriptions?.find((obj) => obj.sub_data.username == username) ? true : false} />
              }
            </>}

        <div className={styles.user_social_data_mobile}>
          {auth_store.user.username === username ?
            <>
              <div className={styles.user_data_card_wrapper}>
                <div className={styles.block_header}>Подписчики {auth_store.user.followers.length}</div>
                <div className={styles.people_wrapper}>
                  {auth_store.user.followers.slice(0, 4).map(item => (
                    <Link key={item.follower_data.id} href={'/' + item.follower_data.username} className={styles.people_data}>
                      <div>{item.follower_data.username.slice(0, 1)}</div>
                    </Link>
                  ))}
                  {auth_store.user.followers.length > 4 ?
                    <div className={styles.last_elem}>
                      <div>+{auth_store.user.followers.length - 4}</div>
                    </div>
                    : null}
                </div>
              </div>
              <div className={styles.user_data_card_wrapper}>
                <div className={styles.block_header}>Подписки {auth_store.user.subscriptions.length}</div>
                <div className={styles.people_wrapper}>
                  {auth_store.user.subscriptions.slice(0, 4).map(item => (
                    <Link key={item.sub_data.id} href={'/' + item.sub_data.username} className={styles.people_data}>
                      <div>{item.sub_data.username.slice(0, 1)}</div>
                    </Link>
                  ))}
                  {auth_store.user.subscriptions.length > 4 ?
                    <div className={styles.last_elem}>
                      <div>+{auth_store.user.subscriptions.length - 4}</div>
                    </div>
                    : null}
                </div>
              </div>
              <div className={styles.user_data_card_wrapper}>
                <div className={styles.block_header}>Списки {content_store.myPlaylists.length}</div>
                <div className={styles.people_wrapper}>
                  {content_store.myPlaylists.slice(0, 4).map(item => (
                    <Link key={item.id} href={'/playlists/' + item.id} className={styles.playlist_data}>
                      <div>{item.name.slice(0, 1)}</div>
                    </Link>
                  ))}
                  {content_store.myPlaylists?.length > 4 ?
                    <div className={styles.last_elem}>
                      <div>+{content_store.myPlaylists?.length - 4}</div>
                    </div>
                    : null}
                </div>
              </div>
            </>
            :
            <>
              <div className={styles.user_data_card_wrapper}>
                <div className={styles.block_header}>Подписчики {user_store.user.followers?.length}</div>
                <div className={styles.people_wrapper}>

                  {user_store.user.followers?.slice(0, 4).map(item => (
                    <Link key={item.follower_data.id} href={'/' + item.follower_data.username} className={styles.people_data}>
                      <div>{item.follower_data.username.slice(0, 1)}</div>
                    </Link>
                  ))}
                  {user_store.user.followers?.length > 4 ?
                    <div className={styles.last_elem}>
                      <div>+{user_store.user.followers?.length - 4}</div>
                    </div>
                    : null}
                </div>
              </div>
              <div className={styles.user_data_card_wrapper}>
                <div className={styles.block_header}>Подписки {user_store.user.subscriptions?.length}</div>
                <div className={styles.people_wrapper}>
                  {user_store.user.subscriptions?.slice(0, 4).map(item => (
                    <Link key={item.sub_data.id} href={'/' + item.sub_data.username} className={styles.people_data}>
                      <div>{item.sub_data.username.slice(0, 1)}</div>
                    </Link>
                  ))}
                  {user_store.user.subscriptions?.length > 4 ?
                    <div className={styles.last_elem}>
                      <div>+{user_store.user.subscriptions?.length - 4}</div>
                    </div>
                    : null}
                </div>
              </div>
              <div className={styles.user_data_card_wrapper}>
                <div className={styles.block_header}>Списки {content_store.userPlaylists?.length}</div>
                <div className={styles.people_wrapper}>
                  {content_store.userPlaylists?.slice(0, 4).map(item => (
                    <Link key={item.Playlists.id} href={'/playlists/' + item.Playlists.id} className={styles.playlist_data}>
                      <div>{item.Playlists.name.slice(0, 1)}</div>
                    </Link>
                  ))}
                  {content_store.userPlaylists?.length > 4 ?
                    <div className={styles.last_elem}>
                      <div>+{content_store.userPlaylists?.length - 4}</div>
                    </div>
                    : null}
                </div>
              </div>
            </>
          }
        </div>
        {auth_store.user.username === username && auth_store.isAuth ?

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
                        <span>Здесь пока ничего нет</span>
                      </div>
                  }
                </> :
                <>
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

                        <span>Здесь пока ничего нет</span>
                      </div>
                  }
                </>}
            </>

            : null
          }
          {activeTab === 'activity' ?
            <>
              {auth_store.user.username === username ?
                <>
                  {auth_store.user.user_activity.length > 0 ?
                    <>
                      {auth_store.user.user_activity.map(item => (
                        <div key={item.game_data.id}>

                          < ActivityCard title={item.game_data.title} cover={item.game_data.cover}
                            release_date={item.game_data.release_date} slug={item.game_data.slug}
                            description={item.game_data.description} activity_type={item.activity_data.name} />
                        </div>
                      ))
                      }
                    </> :
                    <div className={styles.card_wrapper}>
                      <span>Здесь пока ничего нет</span>
                    </div>}
                </>
                :
                <>
                  {user_store.user.user_activity.length > 0 ?
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
                    </> :
                    <div className={styles.card_wrapper}>
                      <span>Здесь пока ничего нет</span>
                    </div>}

                </>
              }
            </>
            : null
          }
          {activeTab === 'favorite' ?
            <>
              {auth_store.user.username === username ?

                <>
                  {auth_store.user.user_favorite.length > 0 ?
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
                    <div className={styles.card_wrapper}>
                      <span>Здесь пока ничего нет</span>
                    </div>}
                </>
                :
                <>
                  {user_store.user.user_favorite.length > 0 ?
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
                    :
                    <div className={styles.card_wrapper}>
                      <span>Здесь пока ничего нет</span>
                    </div>}
                </>
              }
            </>
            : null
          }
        </div>

      </main >
      <div className="right_side_wrapper">
        <div className={styles.user_stats_desk}>
          {auth_store.user.username === username ?
            <>
              <UserStatsCard
                activity={auth_store.user.user_activity}
                favorite={auth_store.user.user_favorite} />
              <div className={styles.user_data_card_wrapper}>
                <div className={styles.block_header}>Подписчики {auth_store.user.followers.length}</div>
                <div className={styles.people_wrapper}>
                  {auth_store.user.followers.slice(0, 4).map(item => (
                    <Link key={item.follower_data.id} href={'/' + item.follower_data.username} className={styles.people_data}>
                      <div>{item.follower_data.username.slice(0, 1)}</div>
                    </Link>
                  ))}
                  {auth_store.user.followers.length > 4 ?
                    <div className={styles.last_elem}>
                      <div>+{auth_store.user.followers.length - 4}</div>
                    </div>
                    : null}
                </div>
              </div>
              <div className={styles.user_data_card_wrapper}>
                <div className={styles.block_header}>Подписки {auth_store.user.subscriptions.length}</div>
                <div className={styles.people_wrapper}>
                  {auth_store.user.subscriptions.slice(0, 4).map(item => (
                    <Link key={item.sub_data.id} href={'/' + item.sub_data.username} className={styles.people_data}>
                      <div>{item.sub_data.username.slice(0, 1)}</div>
                    </Link>
                  ))}
                  {auth_store.user.subscriptions.length > 4 ?
                    <div className={styles.last_elem}>
                      <div>+{auth_store.user.subscriptions.length - 4}</div>
                    </div>
                    : null}
                </div>
              </div>
              <div className={styles.user_data_card_wrapper}>
                <div className={styles.block_header}>Списки {content_store.myPlaylists.length}</div>
                <div className={styles.people_wrapper}>
                  {content_store.myPlaylists.slice(0, 4).map(item => (
                    <Link key={item.id} href={'/playlists/' + item.id} className={styles.playlist_data}>
                      <div>{item.name.slice(0, 1)}</div>
                    </Link>
                  ))}
                  {content_store.myPlaylists?.length > 4 ?
                    <div className={styles.last_elem}>
                      <div>+{content_store.myPlaylists?.length - 4}</div>
                    </div>
                    : null}
                </div>
              </div>
            </>
            :
            <>
              <UserStatsCard
                activity={user_store.user.user_activity}
                favorite={user_store.user.user_favorite} />
              <div className={styles.user_data_card_wrapper}>
                <div className={styles.block_header}>Подписчики {user_store.user.followers?.length}</div>
                <div className={styles.people_wrapper}>

                  {user_store.user.followers?.slice(0, 4).map(item => (
                    <Link key={item.follower_data.id} href={'/' + item.follower_data.username} className={styles.people_data}>
                      <div>{item.follower_data.username.slice(0, 1)}</div>
                    </Link>
                  ))}
                  {user_store.user.followers?.length > 4 ?
                    <div className={styles.last_elem}>
                      <div>+{user_store.user.followers?.length - 4}</div>
                    </div>
                    : null}
                </div>
              </div>
              <div className={styles.user_data_card_wrapper}>
                <div className={styles.block_header}>Подписки {user_store.user.subscriptions?.length}</div>
                <div className={styles.people_wrapper}>
                  {user_store.user.subscriptions?.slice(0, 4).map(item => (
                    <Link key={item.sub_data.id} href={'/' + item.sub_data.username} className={styles.people_data}>
                      <div>{item.sub_data.username.slice(0, 1)}</div>
                    </Link>
                  ))}
                  {user_store.user.subscriptions?.length > 4 ?
                    <div className={styles.last_elem}>
                      <div>+{user_store.user.subscriptions?.length - 4}</div>
                    </div>
                    : null}
                </div>
              </div>
              <div className={styles.user_data_card_wrapper}>
                <div className={styles.block_header}>Списки {content_store.userPlaylists?.length}</div>
                <div className={styles.people_wrapper}>
                  {content_store.userPlaylists?.slice(0, 4).map(item => (
                    <Link key={item.Playlists.id} href={'/playlists/' + item.Playlists.id} className={styles.playlist_data}>
                      <div>{item.Playlists.name.slice(0, 1)}</div>
                    </Link>
                  ))}
                  {content_store.userPlaylists?.length > 4 ?
                    <div className={styles.last_elem}>
                      <div>+{content_store.userPlaylists?.length - 4}</div>
                    </div>
                    : null}
                </div>
              </div>
            </>
          }
        </div>
      </div>

    </>
  );
}

export default observer(UserProfile);
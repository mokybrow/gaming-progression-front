'use client'

import { Context } from "@/app/providers";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
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
import useOutside from "@/hooks/useOutside";
import { FullScreenPopup } from "@/components/popup/main_popup/FullScreenPopup";
import UniversalCard from "@/components/cards/universal_card/UniversalCard";
import PlaylistCard from "@/components/cards/playlists/PlaylistCard";
import { PostPopUp } from "@/components/popup/posts/PostPopUp";

function UserProfile() {

  const pathname = usePathname()

  const { auth_store } = useContext(Context);
  const { content_store } = useContext(Context);
  const { user_store } = useContext(Context);
  const username = pathname.substring(pathname.lastIndexOf('/') + 1)
  const [isShowRepost, setIsShowRepost] = useState(false);
  const [isShowPost, setIsShowPost] = useState(false);

  const [fetching, setFetching] = useState(false)

  let tabs = [
    { id: "posts", label: "Посты" },
    { id: "activity", label: "Активность" },
    { id: "favorite", label: "Любимые" },
  ];

  let [activeTab, setActiveTab] = useState(tabs[0].id);
  const [showLists, setShowLists] = useState(false);
  const [showFollower, setShowFollowers] = useState(false);
  const [showSubscribers, setShowSubscribers] = useState(false);
  const popupRef = useRef(null)
  const [active, setActive] = useState(false)
  const [toastText, setToastText] = useState<string>('')
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
        if (auth_store.user.username === username) {
          content_store.getUserWallScroll(username, content_store.myPage, auth_store.user.username, auth_store.user.id).then(resp => {
            content_store.setMyPage(content_store.myPage + 10)

          }).finally(() => setFetching(false))
        }
        if (auth_store.user.username !== username) {
          content_store.getUserWallScroll(username, content_store.userPage, auth_store.user.username, auth_store.user.id).then(resp => {
            content_store.setUserPage(content_store.userPage + 10)

          }).finally(() => setFetching(false))
        }

      } catch (error) {

      }
    }

  }, [fetching, auth_store, content_store, user_store, username])

  useEffect(() => {

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
              content_store.setUserPage(10)
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

  }, [])

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

  useOutside(popupRef, () => {
    if (showLists) {
      setTimeout(() => setShowLists(false), 50)
    }
    if (showFollower) {
      setTimeout(() => setShowFollowers(false), 50)
    }
    if (showSubscribers) {
      setTimeout(() => setShowSubscribers(false), 50)
    }

  })

  return (
    <>
      <PostPopUp active={showLists} setActive={setShowLists}>
        <UniversalCard setIsShow={setShowLists}>
          {auth_store.user.username === username ?
            <div className={styles.playlists_grid}>
              {content_store.myPlaylists.map(item => (
                <div key={item.id}>
                  <PlaylistCard
                    id={item.id}
                    owner_id={item.owner_id}
                    name={item.name}
                    owner_data={item.owner_data}
                    list_games={item.list_games}
                    addedPlaylist={content_store.myPlaylists.some(list => list.id == item.id) ? 1 : 0}
                    setActive={setActive}
                    setToastText={setToastText}
                    about={item.about} />
                </div>
              ))}
            </div>
            :
            <div className={styles.playlists_grid}>
              {content_store.userPlaylists.map(item => (
                <div key={item.Playlists.id}>
                  <PlaylistCard
                    id={item.Playlists.id}
                    owner_id={item.Playlists.owner_id}
                    name={item.Playlists.name}
                    about={item.Playlists.about}
                    owner_data={item.Playlists.owner_data}
                    list_games={item.Playlists.list_games}
                    addedPlaylist={item.addedPlaylist}
                    setActive={setActive}
                    setToastText={setToastText}
                  />
                </div>
              ))}
            </div>
          }
        </UniversalCard>
      </PostPopUp>
      <PostPopUp active={showSubscribers} setActive={setShowSubscribers}>
        <UniversalCard setIsShow={setShowSubscribers}>
          {auth_store.user.username === username ?
            <div className={styles.users_grid}>
              {auth_store.user.subscriptions?.map(user => (
                <div className={styles.user_wrapper} key={user.sub_data.id}>
                  <Link href={'/' + user.sub_data.username} className={styles.user_cover_wrapper}>
                    <div>{user.sub_data.username.slice(0, 1)}</div>
                  </Link>
                  <Link href={'/' + user.sub_data.username} >
                    <div>{user.sub_data.full_name ? <>{user.sub_data.full_name}</> : <>{user.sub_data.username}</>}</div>
                  </Link>
                </div>
              ))}
            </div>
            :
            <div className={styles.users_grid}>
              {user_store.user.subscriptions?.map(user => (
                <div className={styles.user_wrapper} key={user.sub_data.id}>
                  <Link href={'/' + user.sub_data.username} className={styles.user_cover_wrapper}>
                    <div>{user.sub_data.username.slice(0, 1)}</div>
                  </Link>
                  <Link href={'/' + user.sub_data.username} >
                    <div>{user.sub_data.full_name ? <>{user.sub_data.full_name}</> : <>{user.sub_data.username}</>}</div>
                  </Link>
                </div>
              ))}
            </div>
          }
        </UniversalCard>
      </PostPopUp>
      <PostPopUp active={showFollower} setActive={setShowFollowers}>
        <UniversalCard setIsShow={setShowFollowers}>
          {auth_store.user.username === username ?
            <div className={styles.users_grid}>
              {auth_store.user.followers?.map(user => (
                <div className={styles.user_wrapper} key={user.follower_data.id}>
                  <Link href={'/' + user.follower_data.username} className={styles.user_cover_wrapper}>
                    <div>{user.follower_data.id.slice(0, 1)}</div>
                  </Link>
                  <Link href={'/' + user.follower_data.username} >
                    <div>{user.follower_data.full_name ? <>{user.follower_data.full_name}</> : <>{user.follower_data.username}</>}</div>
                  </Link>
                </div>
              ))}
            </div>
            :
            <div className={styles.users_grid}>
              {user_store.user.followers?.map(user => (
                <div className={styles.user_wrapper} key={user.follower_data.id}>
                  <Link href={'/' + user.follower_data.username} className={styles.user_cover_wrapper}>
                    <div>{user.follower_data.username.slice(0, 1)}</div>
                  </Link>
                  <Link href={'/' + user.follower_data.username} >
                    <div>{user.follower_data.full_name ? <>{user.follower_data.full_name}</> : <>{user.follower_data.username}</>}</div>
                  </Link>
                </div>
              ))}
            </div>
          }
        </UniversalCard>
      </PostPopUp>
      <main className="main_content_wrapper">
        {
          auth_store.user.username === username ?
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
              isOwner={auth_store.user.username === username}
              isFollow={auth_store.user?.subscriptions?.find((obj) => obj.sub_data.username == username) ? true : false} />
        }


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
                    <div className={styles.last_elem} onClick={() => setShowFollowers(true)}>
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
                    <div className={styles.last_elem} onClick={() => setShowSubscribers(true)}>
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
                    <div className={styles.last_elem} onClick={() => setShowLists(true)}>
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
                    <div className={styles.last_elem} onClick={() => setShowFollowers(true)}>
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
                    <div className={styles.last_elem} onClick={() => setShowSubscribers(true)}>
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
                    <div className={styles.last_elem} onClick={() => setShowLists(true)}>
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
                    <div className={styles.last_elem} onClick={() => setShowFollowers(true)}>
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
                    <div className={styles.last_elem} onClick={() => setShowSubscribers(true)}>
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
                    <div className={styles.last_elem} onClick={() => setShowLists(true)}>
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
                    <div className={styles.last_elem} onClick={() => setShowFollowers(true)}>
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
                    <div className={styles.last_elem} onClick={() => setShowSubscribers(true)}>
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
                    <div className={styles.last_elem} onClick={() => setShowLists(true)}>
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
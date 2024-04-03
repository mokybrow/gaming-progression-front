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
import { motion } from "framer-motion";
import ActivityCard from "@/components/cards/activity_card/ActivityCard";
import FavoriteCard from "@/components/cards/favorite_card/FavoriteCard";
import PostCard from "@/components/cards/post_card/PostCard";
import { v4 as uuidv4 } from 'uuid';
import { SubmitButton } from "@/components/buttons/SubmitButton";


function UserProfile() {

  const pathname = usePathname()

  const { auth_store } = useContext(Context);
  const { content_store } = useContext(Context);
  const username = pathname.substring(pathname.lastIndexOf('/') + 1)

  const [postText, setPostText] = useState<string>('');
  const [suggestions, setSuggestions] = useState<SearchUserModel[]>([]);
  const [customers, setCustomers] = useState<any>([]);


  let tabs = [
    { id: "posts", label: "Посты" },
    { id: "activity", label: "Активность" },
    { id: "favorite", label: "Любимые" },
  ];

  let [activeTab, setActiveTab] = useState(tabs[0].id);

  useEffect(() => {
    auth_store.checkAuth(username)

  }, [auth_store])

  const handleChangeForMainComment = (event: any) => {
    setPostText(event.value)
  }
  const onSearch = (event: { query: any; }) => {
    setTimeout(() => {
      let suggestions;
      if (event.query != '') {

        content_store.searchUser(event.query)
      }
      else {
        content_store.setSearchUsers([])
      }

      if (!content_store.users.length) {
        suggestions = [...customers];
      }
      else {
        suggestions = content_store.users.filter(customer => {
          return customer.username;
        })

      }

      setSuggestions(suggestions);
    }, 1000);
  }
  const itemTemplate = (suggestion: SearchUserModel) => {

    return (
      <div>
        <span className={styles.item_temlate_span}>
          {suggestion.username}
          <small style={{ fontSize: '.75rem' }}>@{suggestion.username}</small>
        </span>
      </div>
    );
  }

  const createNewPost = () => {
    let newComment = postText;
    if (newComment != '') {
      let comment = newComment.replace(/\s+/g, ' ').trim();
      const result = comment.replace(/(^|\W)@(\w+)/g, function (_, $1, $2) { return `[@${$2}](/${$2})` })

      auth_store.createNewPost(uuidv4(), null, result, username)
      setPostText('')

    }
  }

  const NewOffset = () => {
    auth_store.incrementOffset()
    auth_store.postsOffset(username)

  }

  const followHandler = () => {
    auth_store.followOnUser(auth_store.anotherUsers.id)
    auth_store.user.subscriptions.push(...[{ sub_data: { id: auth_store.anotherUsers.id, username: auth_store.anotherUsers.username, full_name: auth_store.anotherUsers.full_name } }])
  }
  const unFollow = () => {
    auth_store.followOnUser(auth_store.anotherUsers.id)
    const index = auth_store.user.subscriptions.findIndex(n => n.sub_data.username === username);
    if (index !== -1) {
      auth_store.user.subscriptions.splice(index, 1);
    }
  }

  return (
    <>
      <main className="content_wrapper">

        {
          !auth_store.isAuth || username !== auth_store.user.username ?
            <div className={styles.user_main_wrapper}>
              <div className={styles.user_info_wrapper}>

                <div>
                  <Image
                    src={userpic}
                    width={100}
                    height={100}
                    alt="user" />
                </div>
                <h3>
                  {auth_store.anotherUsers.full_name != null ?
                    <>
                      {auth_store.anotherUsers.full_name}
                    </>
                    :
                    <>
                      {auth_store.anotherUsers.username}
                    </>
                  }
                </h3>
                <small>
                  <span>На борту с </span>
                  <FormattedDate
                    value={auth_store.anotherUsers.created_at}
                    year='numeric'
                    month='short'
                    day='numeric' />
                </small>
                <div>
                  <span>{auth_store.anotherUsers.biography}</span>
                </div>
              </div>
              <div className={styles.user_wrapper_buttons}>

                <div className={styles.buttons_wrapper}>
                  {auth_store.user?.subscriptions?.find((obj) => obj.sub_data.username == username) ?
                    <>
                      <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={12}
                        onClick={() => unFollow()}>
                        Отписаться
                      </FunctionalGameButton>
                    </> :
                    <>
                      <FunctionalGameButton type={'button'} bg_color={'#0368CD'} fontSize={12} color={'#E8E8ED'}
                        onClick={() => followHandler()}>
                        Подписаться
                      </FunctionalGameButton>
                    </>
                  }

                  <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={12} color={'#E8E8ED'}
                    onClick={() => console.log('as')}>
                    <div className={styles.flag_icon}>
                    </div>
                  </FunctionalGameButton>
                </div>

              </div>
            </div>


            :
            <div className={styles.user_main_wrapper_owner}>
              <div className={styles.user_info_wrapper}>
                <div>
                  <Image
                    src={userpic}
                    width={100}
                    height={100}
                    alt="user" />
                </div>
                <h3>
                  {auth_store.user.full_name != null ?
                    <>
                      {auth_store.user.full_name}
                    </>
                    :
                    <>
                      {auth_store.user.username}
                    </>
                  }
                </h3>
                <small>
                  <span>На борту с </span>
                  <FormattedDate
                    value={auth_store.user.created_at}
                    year='numeric'
                    month='short'
                    day='numeric' />
                </small>
                <div>
                  <span>{auth_store.user.biography}</span>
                </div>
              </div>
            </div>
        }
        {
          !auth_store.isAuth || username !== auth_store.user.username ? null :
            <div className={styles.post_text_filed}>
              <Mention onChange={(e) => handleChangeForMainComment(e.target)}
                value={postText} suggestions={suggestions} onSearch={onSearch} field="username"
                placeholder="Что нового?" itemTemplate={itemTemplate}
                className={styles.mention} rows={1} autoResize />


              {postText !== "" && postText.replace(/\s+/g, ' ').trim() !== "" ? <>
                <div className={styles.send_button_wrapper}>
                  <hr />
                  <FunctionalGameButton type={'button'} bg_color={'#0368CD'} fontSize={12} color={'#E8E8ED'}
                    onClick={() => createNewPost()}>
                    Опубликовать
                  </FunctionalGameButton>
                </div>
              </> : null}

            </div>
        }
        <div className={styles.user_content_wrapper}>
          <div className={styles.nav_buttons_wrapper}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={styles.motion_button}
                style={{
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="bubble"
                    className={styles.motion_style}
                    style={{ borderRadius: 9999 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>
          {activeTab === 'posts' ?
            <>
              {
                !auth_store.isAuth || username !== auth_store.user.username ?
                  <>
                    {
                      auth_store.userPosts?.length > 0 ?
                        <>
                          {auth_store.userPosts?.map(item => (
                            <div key={item.Posts.id}>
                              <PostCard text={item.Posts.text} like_count={item.Posts.like_count}
                                created_at={item.Posts.created_at} postId={item.Posts.id}
                                comment_count={item.commentCount} full_name={item.Posts.users.full_name}
                                username={item.Posts.users.username} parentPostData={item.Posts.parent_post_data} />
                            </div>
                          ))}
                        </>
                        :
                        <div className={styles.card_wrapper}>

                          <div className={styles.feed_icon}></div>
                          <span>Здесь пока ничего нет</span>
                        </div>
                    }

                  </>
                  :
                  <>
                    {
                      auth_store.userPosts?.length > 0 ?
                        <>
                          {auth_store.userPosts?.map(item => (
                            <div key={item.Posts.id}>
                              <PostCard text={item.Posts.text} like_count={item.Posts.like_count}
                                created_at={item.Posts.created_at} postId={item.Posts.id}
                                comment_count={item.commentCount} full_name={item.Posts.users.full_name}
                                username={item.Posts.users.username} parentPostData={item.Posts.parent_post_data} />
                            </div>
                          ))}
                        </>
                        :
                        <div className={styles.card_wrapper}>

                          <div className={styles.feed_icon}></div>
                          <span>Здесь пока ничего нет</span>
                        </div>
                    }
                  </>}
              {auth_store.postsCount.posts_count > 10 && auth_store.offset < auth_store.postsCount.posts_count ?
                <div className={styles.button_wrapper}>

                  <SubmitButton type={'button'} onClick={() => NewOffset()}>Показать ещё</SubmitButton>
                </div>
                :
                null
              }

            </>
            : null}
          {activeTab === 'activity' ?
            <>
              {
                !auth_store.isAuth || username !== auth_store.user.username ?
                  <>
                    {
                      auth_store.anotherUsers.user_activity?.length > 0 ?
                        <>
                          {auth_store.anotherUsers.user_activity?.map(item => (
                            <div key={item.activity_data.id}>
                              <ActivityCard title={item.game_data.title} cover={item.game_data.cover}
                                release_date={item.game_data.release_date} slug={item.game_data.slug}
                                description={item.game_data.description}
                                activity_type={item.activity_data.name} />

                            </div>
                          ))}
                        </>
                        :
                        <div className={styles.card_wrapper}>

                          <div className={styles.feed_icon}></div>
                          <span>Здесь пока ничего нет</span>
                        </div>
                    }
                  </>
                  :
                  <>
                    {
                      auth_store.user.user_activity?.length > 0 ?
                        <>
                          {auth_store.user.user_activity.map(item => (
                            <div key={item.game_data.id}>

                              <ActivityCard title={item.game_data.title} cover={item.game_data.cover}
                                release_date={item.game_data.release_date} slug={item.game_data.slug}
                                description={item.game_data.description}
                                activity_type={item.activity_data.name} />
                            </div>
                          ))}
                        </>
                        :
                        <div className={styles.card_wrapper}>

                          <div className={styles.feed_icon}></div>
                          <span>Здесь пока ничего нет</span>
                        </div>
                    }
                  </>}
            </>
            : null}
          {
            activeTab === 'favorite' ?
              <>
                {
                  !auth_store.isAuth || username !== auth_store.user.username ?
                    <>
                      {
                        auth_store.anotherUsers.user_favorite?.length > 0 ?
                          <>
                            {auth_store.anotherUsers.user_favorite?.map(item => (
                              <div key={item.game_data.id}>

                                <FavoriteCard title={item.game_data.title} cover={item.game_data.cover}
                                  release_date={item.game_data.release_date} slug={item.game_data.slug}
                                  description={item.game_data.description} />

                              </div>
                            ))}
                          </>
                          :
                          <div className={styles.card_wrapper}>

                            <div className={styles.feed_icon}></div>
                            <span>Здесь пока ничего нет</span>
                          </div>
                      }
                    </>
                    :
                    <>
                      {
                        auth_store.user.user_favorite?.length > 0 ?
                          <>
                            {auth_store.user.user_favorite.map(item => (
                              <div key={item.game_data.id}>
                                <FavoriteCard title={item.game_data.title} cover={item.game_data.cover}
                                  release_date={item.game_data.release_date} slug={item.game_data.slug}
                                  description={item.game_data.description} />

                              </div>
                            ))}
                          </>
                          :
                          <div className={styles.card_wrapper}>

                            <div className={styles.feed_icon}></div>
                            <span>Здесь пока ничего нет</span>
                          </div>
                      }
                    </>}
              </>
              : null
          }
        </div>

      </main >
      <main className="right_side_wrapper">
        {
          !auth_store.isAuth || username !== auth_store.user.username ?
            <>
              <div className={styles.cards_wrapper}>
                <div className={styles.stat_card}>
                  <span>Подписчиков {auth_store.anotherUsers.followers?.length}</span>
                </div>
                <div className={styles.stat_card}>
                  <span>Подписок {auth_store.anotherUsers.subscriptions?.length}</span>
                </div>
                <div className={styles.stat_card}>
                  <span>Списков {auth_store.anotherUsers.lists?.length}</span>
                </div>

                {/* Вот тут идут иконки с цифрами */}
                <div className={styles.stat_card_icons}>
                  <div className={styles.button_data_wrapper}>
                    <div className={styles.rocket_logo}></div>
                    <span>{auth_store.anotherUsers.user_activity?.filter(function (el) { return el.activity_data.code === 200000 }).length}</span>
                  </div>
                  <div className={styles.button_data_wrapper}>
                    <div className={styles.finish_logo}></div>
                    <span>{auth_store.anotherUsers.user_activity?.filter(function (el) { return el.activity_data.code === 220000 }).length}</span>

                  </div>
                  <div className={styles.button_data_wrapper}>
                    <div className={styles.heart_logo}></div>
                    <span>{auth_store.anotherUsers.user_favorite?.length}</span>

                  </div>
                  <div className={styles.button_data_wrapper}>
                    <div className={styles.bag_logo}></div>
                    <span>{auth_store.anotherUsers.user_activity?.filter(function (el) { return el.activity_data.code === 210000 }).length}</span>

                  </div>
                </div>
              </div>
            </>
            :
            <>
              <div className={styles.cards_wrapper}>
                <div className={styles.stat_card}>
                  <span>Подписчиков {auth_store.user.followers?.length}</span>
                </div>
                <div className={styles.stat_card}>
                  <span>Подписок {auth_store.user.subscriptions?.length}</span>
                </div>
                <div className={styles.stat_card}>
                  <span>Списков {auth_store.user.lists?.length}</span>
                </div>
                {/* Вот тут идут иконки с цифрами */}
                <div className={styles.stat_card_icons}>
                  <div className={styles.button_data_wrapper}>
                    <div className={styles.rocket_logo}></div>
                    <span>{auth_store.user.user_activity?.filter(function (el) { return el.activity_data.code === 200000 }).length}</span>
                  </div>
                  <div className={styles.button_data_wrapper}>
                    <div className={styles.finish_logo}></div>
                    <span>{auth_store.user.user_activity?.filter(function (el) { return el.activity_data.code === 220000 }).length}</span>

                  </div>
                  <div className={styles.button_data_wrapper}>
                    <div className={styles.heart_logo}></div>
                    <span>{auth_store.user.user_favorite?.length}</span>

                  </div>
                  <div className={styles.button_data_wrapper}>
                    <div className={styles.bag_logo}></div>
                    <span>{auth_store.user.user_activity?.filter(function (el) { return el.activity_data.code === 210000 }).length}</span>

                  </div>
                </div>
              </div>
            </>
        }
      </main>

    </>
  );
}

export default observer(UserProfile);
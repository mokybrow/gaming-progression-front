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
    //in a real application, make a request to a remote url with the query and return suggestions, for demo we filter at client side
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

  const createNesPost = (itemId: string, parentCommentId?: string | null) => {
    // let newComment = postText;
    // if (newComment != '') {
    //     let comment = newComment.replace(/\s+/g, ' ').trim();
    //     const result = comment.replace(/(^|\W)@(\w+)/g, function (_, $1, $2) { return `[@${$2}](/${$2})` })
    //     auth_store.addNewComment(itemId, result, parentCommentId)

    // }
  }

  return (
    <>
      <main className="content_wrapper">
        <div className={styles.user_main_wrapper}>

          <div className={styles.user_info_wrapper}>
            {
              !auth_store.isAuth || username !== auth_store.user.username ?
                <>
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
                    <span>На боту с </span>
                    <FormattedDate
                      value={auth_store.anotherUsers.created_at}
                      year='numeric'
                      month='long'
                      day='numeric' />
                  </small>
                  <div>
                    <span>{auth_store.anotherUsers.biography}</span>
                  </div>
                </>
                :
                <>
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
                    <span>На боту с </span>
                    <FormattedDate
                      value={auth_store.user.created_at}
                      year='numeric'
                      month='long'
                      day='numeric' />
                  </small>
                  <div>
                    <span>{auth_store.user.biography}</span>
                  </div>
                </>
            }
          </div>
          <div className={styles.user_wrapper_buttons}>
            {
              auth_store.isAuth && username !== auth_store.user.username ?
                <div className={styles.buttons_wrapper}>
                  <FunctionalGameButton type={'button'} bg_color={'#0368CD'} fontSize={12} color={'#E8E8ED'}
                    onClick={() => console.log('as')}>
                    Подписаться
                  </FunctionalGameButton>
                  <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={12} color={'#E8E8ED'}
                    onClick={() => console.log('as')}>
                    <div className={styles.flag_icon}>
                    </div>
                  </FunctionalGameButton>
                </div>
                :
                null
            }
          </div>

        </div>
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
                    onClick={() => { (createNesPost('123', ''), setPostText('')) }}>
                    Опубликовать
                  </FunctionalGameButton>
                </div>
              </> : null}

            </div>
        }
        <div className={styles.user_content_wrapper}>
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
      </main>
      <main className="right_side_wrapper">
        Йоу
      </main>

    </>
  );
}

export default observer(UserProfile);
'use client'

import { Context } from "@/app/providers";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import styles from './page.module.css'
import { FormattedDate } from 'react-intl';
import { observer } from "mobx-react-lite";
import { Mention } from 'primereact/mention';
import { SearchUserModel } from "@/models/userModel";

function UserProfile() {

  const pathname = usePathname()

  const { auth_store } = useContext(Context);
  const { content_store } = useContext(Context);
  const username = pathname.substring(pathname.lastIndexOf('/') + 1)

  const [postText, setPostText] = useState<string>('');
  const [suggestions, setSuggestions] = useState<SearchUserModel[]>([]);
  const [customers, setCustomers] = useState<any>([]);

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
  
  return (
    <>
      <main className="content_wrapper">
        <div className={styles.user_main_wrapper}>

          <div className={styles.user_info_wrapper}>
            {
              !auth_store.isAuth || username !== auth_store.user.username ?
                <>
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
            <div>Ахаахх</div>
          </div>

        </div>
        <Mention onChange={(e) => handleChangeForMainComment(e.target)}
          value={postText} suggestions={suggestions} onSearch={onSearch} field="username"
          placeholder="Что нового?" itemTemplate={itemTemplate}
          style={{ height: '30px' }} className={styles.mention} autoResize />


      </main>
      <main className="right_side_wrapper">
        Йоу
      </main>

    </>
  );
}

export default observer(UserProfile);
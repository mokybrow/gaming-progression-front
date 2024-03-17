'use client'

import styles from './header.module.css'

import { useContext, useEffect, useRef, useState } from 'react';
import useOutside from '@/hooks/useOutside'
import { ProfilePopup } from '../popup/ProfilePopup';
import Image from 'next/image'
import Link from 'next/link';
import { Context } from '@/app/providers';
import { observer } from 'mobx-react';
import { getLocalToken } from '@/utils/tokenUtils';
import userpic from '@/assets/icons/general/userpic.png'
import { UserProfileButton } from '../buttons/UserProfileButton';

export function Header() {
    const [isShow, setIsShow] = useState(false);
    const { auth_store } = useContext(Context);

    useEffect(() => {
        if (getLocalToken()) {
            auth_store.checkAuth()
        }
    }, [auth_store])



    const popupRef = useRef(null)
    useOutside(popupRef, () => {
        if (isShow) {
            setTimeout(() => setIsShow(false), 50)
        }
    })

    return (
        <>
            <header className={styles.header}>
                <div className={styles.header_layout}>
                    <div className={styles.logo_wrapper}>
                        <a href="/">
                            <div className={styles.logo}></div>
                        </a>
                    </div>

                    <div className={styles.search_wrapper}>
                        <input type="text" />
                    </div>

                    {auth_store.isLoading ? null :
                        <div className={styles.profile_section}>
                            {auth_store.isAuth ?
                                <UserProfileButton type={'button'} onClick={() => setIsShow(!isShow)} height={32}>
                                    {auth_store.user.username}
                                    <Image
                                        src={userpic}
                                        width={24}
                                        height={24}
                                        alt="user"
                                    />
                                </UserProfileButton>

                                :
                                <Link href={'/sign-in'} className={styles.login_button}>
                                    Войти
                                </Link>
                            }
                            <ProfilePopup active={isShow} innerRef={popupRef}>


                                <a href={'/' + auth_store.user.username} onClick={() => setIsShow(!isShow)}>

                                    <div className={styles.user_icon}></div>
                                    <span>
                                        {auth_store.user.full_name}
                                    </span>
                                </a>
                                <a href={auth_store.user.username + '/settings'} onClick={() => setIsShow(!isShow)}>


                                    <div className={styles.settings_icon}></div>

                                    <span>
                                        Настройки
                                    </span>
                                </a>

                                <a href={auth_store.user.username + '/'} onClick={() => { auth_store.logout(), setIsShow(!isShow) }}>

                                    <div className={styles.leave_icon}></div>

                                    <span>
                                        Выход
                                    </span>
                                </a>

                            </ProfilePopup>
                        </div>
                    }
                </div>

            </header >

        </>
    );
}

export default observer(Header)

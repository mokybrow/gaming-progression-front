'use client'

import styles from './header.module.css'

import { useContext, useEffect, useRef, useState } from 'react';
import useOutside from '@/hooks/useOutside'
import { ProfilePopup } from '../popup/ProfilePopup';
import Image from 'next/image'
import { Context } from '@/app/providers';
import { observer } from 'mobx-react';
import { getLocalToken } from '@/utils/tokenUtils';
import userpic from '@/assets/icons/general/userpic.svg'
import { UserProfileButton } from '../buttons/UserProfileButton';
import { FullScreenPopup } from '../popup/FullScreenPopup';
import LoginForm from '../forms/login_form/LoginForm';
import { RegistrationForm } from '../forms/reg_form/RegistrationForm';
import SearchField from '../fields/search/SearchField';
import { useRouter } from 'next/navigation';


export function Header() {
    const [isShow, setIsShow] = useState(false);
    const [isAuthShow, setIsAuthShow] = useState(false);
    const [isRegShow, setIsRegShow] = useState(false);
    const { auth_store } = useContext(Context);

    useEffect(() => {
        if (getLocalToken()) {
            auth_store.checkAuth()
        }
    }, [auth_store])

    const router = useRouter();


    const popupRef = useRef(null)
    useOutside(popupRef, () => {
        if (isShow) {
            setTimeout(() => setIsShow(false), 50)
        }
        if (isAuthShow) {
            setTimeout(() => setIsAuthShow(false), 50)
        }
        if (isRegShow) {
            setTimeout(() => setIsRegShow(false), 50)
        }
    })

    return (
        <>
            <FullScreenPopup active={isRegShow} setActive={setIsRegShow}>
                <RegistrationForm />
            </FullScreenPopup>
            <FullScreenPopup active={isAuthShow} setActive={setIsAuthShow}>
                <LoginForm />
                <div className={styles.form_elem}>
                    <div className={styles.reglink} onClick={() => (setIsAuthShow(false), setIsRegShow(true))}>Нет аккаунта? Зарегистрироваться.</div>
                </div>
            </FullScreenPopup>
            <header className={styles.header}>
                <div className={styles.header_layout}>
                    <div className={styles.logo_wrapper}>
                        <a href="/">
                            <div className={styles.logo}></div>
                        </a>
                    </div>

                    <div className={styles.search_wrapper}>
                        <SearchField placeholder={'Поиск'} type={'text'} id={''} labelname={'Поиск'} height={32} />
                    </div>


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
                            <div onClick={() => setIsAuthShow(true)} className={styles.login_button}>
                                Войти
                            </div>
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

                            <div onClick={() => { auth_store.logout(), router.refresh(), setIsShow(!isShow) }} className={styles.exit_button}>

                                <div className={styles.leave_icon}></div>

                                <span>
                                    Выход
                                </span>
                            </div>

                        </ProfilePopup>
                    </div>

                </div>

            </header >

        </>
    );
}

export default observer(Header)

'use client'

import styles from './header.module.css'
import { Suspense } from 'react'

import { useContext, useEffect, useRef, useState } from 'react';
import useOutside from '@/hooks/useOutside'
import { ProfilePopup } from '../popup/profile/ProfilePopup';
import { Context } from '@/app/providers';
import { observer } from 'mobx-react';
import { getLocalToken } from '@/utils/tokenUtils';
import { UserProfileButton } from '../buttons/profile/UserProfileButton';
import { FullScreenPopup } from '../popup/main_popup/FullScreenPopup';

import SearchField from '../fields/search/SearchField';
import { useTheme } from '@/hooks/useTheme';
import MainLogoIcon from '../icons/MainLogo';
import SettingsIcon from '../icons/settings';
import LeaveIcon from '../icons/leave';
import UserIcon from '../icons/user';
import AuthCard from '../cards/auth_card/AuthCard';
import { LoginButton } from '../buttons/login/LoginButton';


export function Header() {

    const { theme, setTheme } = useTheme()

    const [isShow, setIsShow] = useState(false);
    const [isAuthShow, setIsAuthShow] = useState(false);
    const [currentTheme, setCurrentTheme] = useState(false);
    const { auth_store } = useContext(Context);

    useEffect(() => {
        if (getLocalToken()) {
            auth_store.checkAuth()
        }
        if (typeof window !== 'undefined') {
            // Perform localStorage action
            const item = localStorage.getItem('app-theme')
            if (item == 'light') {
                setCurrentTheme(true)
            }
            else {
                setCurrentTheme(false)
            }
        }
    }, [auth_store])

    function themeToggle() {
        setCurrentTheme(!currentTheme)
        if (theme == 'light') {
            setTheme('dark')
        }
        else {
            setTheme('light')
        }

    }

    const popupRef = useRef(null)
    useOutside(popupRef, () => {
        if (isShow) {
            setTimeout(() => setIsShow(false), 50)
        }
        if (isAuthShow) {
            setTimeout(() => setIsAuthShow(false), 50)
        }

    })

    return (
        <>
            <Suspense>

                <FullScreenPopup active={isAuthShow} setActive={setIsAuthShow}>
                    <AuthCard setIsShow={setIsAuthShow} />
                </FullScreenPopup>

                <header className={styles.header}>
                    <div className={styles.header_layout}>
                        <div className={styles.logo_wrapper}>
                            <a href="/">
                                <MainLogoIcon className='main-logo' />
                            </a>
                        </div>

                        <div className={styles.search_wrapper}>
                            <SearchField placeholder={'Поиск'} type={'text'} id={''} labelname={'Поиск'} />
                        </div>
                        <div className={styles.toggle_wrapper_mobile}>
                            <div className={styles.container}>

                                <label id="switch" className={styles.switch}>
                                    <input type="checkbox" id="slider" onChange={() => themeToggle()} checked={currentTheme} />
                                    <span className={styles.slider} >

                                    </span>
                                </label>

                            </div>
                        </div>
                        <div className={styles.profile_section}>
                            <div className={styles.toggle_wrapper}>
                                <div className={styles.container}>

                                    <label id="switch" className={styles.switch}>
                                        <input type="checkbox" id="slider" onChange={() => themeToggle()} checked={currentTheme} />
                                        <span className={styles.slider} ></span>
                                    </label>

                                </div>
                            </div>
                            {auth_store.isAuth ?
                                <UserProfileButton type={'button'} onClick={() => setIsShow(!isShow)}>
                                    {auth_store.user.username}
                                    <div className={styles.icon_wrapper}>
                                        <UserIcon className='general-icon' />
                                    </div>
                                </UserProfileButton>

                                :
                                <LoginButton onClick={() => setIsAuthShow(true)} type={'button'}>
                                    Войти
                                </LoginButton>

                            }

                            <ProfilePopup active={isShow} innerRef={popupRef}>

                                <a href={'/' + auth_store.user.username} onClick={() => setIsShow(!isShow)}>
                                    <span className={styles.icon_wrapper}>
                                        <UserIcon className='general-icon' />
                                    </span>
                                    <span>
                                        {auth_store.user.full_name}
                                    </span>
                                </a>
                                <a href={'/settings'} onClick={() => setIsShow(!isShow)}>
                                    <span className={styles.icon_wrapper}>
                                        <SettingsIcon className="general-icon" />
                                    </span>
                                    <span>
                                        Настройки
                                    </span>
                                </a>

                                <a href={'/'} onClick={() => { auth_store.logout(), setIsShow(!isShow) }}>

                                    <span className={styles.icon_wrapper}>
                                        <LeaveIcon className="general-icon" />
                                    </span>
                                    <span>
                                        Выход
                                    </span>
                                </a>

                            </ProfilePopup>
                        </div>

                    </div>

                </header >

            </Suspense >
        </>

    );
}

export default observer(Header)

'use client'

import styles from './header.module.css'

import { useContext, useEffect, useRef, useState } from 'react';
import useOutside from '@/hooks/useOutside'
import { ProfilePopup } from '../popup/profile/ProfilePopup';
import Image from 'next/image'
import { Context } from '@/app/providers';
import { observer } from 'mobx-react';
import { getLocalToken } from '@/utils/tokenUtils';
import userpic from '@/assets/icons/general/userpic.svg'
import { UserProfileButton } from '../buttons/profile/UserProfileButton';
import { FullScreenPopup } from '../popup/FullScreenPopup';
import LoginForm from '../forms/login_form/LoginForm';
import { RegistrationForm } from '../forms/reg_form/RegistrationForm';
import SearchField from '../fields/search/SearchField';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';
import MainLogoIcon from '../icons/MainLogo';
import SettingsIcon from '../icons/settings';
import LeaveIcon from '../icons/leave';
import UserIcon from '../icons/user';
import ServiceButtonLong from '../buttons/servicelong/ServiceButtonLong';


export function Header() {

    const { theme, setTheme } = useTheme()

    const [isShow, setIsShow] = useState(false);
    const [isAuthShow, setIsAuthShow] = useState(false);
    const [isRegShow, setIsRegShow] = useState(false);
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
                    <div >Нет аккаунта? <span className={styles.reglink} onClick={() => (setIsAuthShow(false), setIsRegShow(true))}>Зарегистрироваться</span></div>
                </div>
            </FullScreenPopup>
            <header className={styles.header}>
                <div className={styles.header_layout}>
                    <div className={styles.logo_wrapper}>
                        <a href="/">
                            <MainLogoIcon className='main-logo' />
                        </a>
                    </div>

                    <div className={styles.search_wrapper}>
                        <SearchField placeholder={'Поиск'} type={'text'} id={''} labelname={'Поиск'} height={32} />
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
                            <UserProfileButton type={'button'} onClick={() => setIsShow(!isShow)} height={32}>
                                {auth_store.user.username}
                                <div className={styles.icon_wrapper}>
                                    <UserIcon className='general-icon' />
                                </div>
                            </UserProfileButton>

                            :
                            <UserProfileButton onClick={() => setIsAuthShow(true)} type={'submit'}>
                                Войти

                            </UserProfileButton>

                        }

                        <ProfilePopup active={isShow} innerRef={popupRef}>


                            <a href={'/' + auth_store.user.username} onClick={() => setIsShow(!isShow)}>
                                <div className={styles.icon_wrapper}>
                                    <UserIcon className='general-icon' />
                                </div>
                                <span>
                                    {auth_store.user.full_name}
                                </span>
                            </a>
                            <a href={'/settings'} onClick={() => setIsShow(!isShow)}>
                                <div className={styles.icon_wrapper}>
                                    <SettingsIcon className="general-icon" />
                                </div>
                                <span>
                                    Настройки
                                </span>
                            </a>

                            <a href={'/'} onClick={() => { auth_store.logout(), setIsShow(!isShow) }}>

                                <div className={styles.icon_wrapper}>
                                    <LeaveIcon className="general-icon" />
                                </div>
                                <span>
                                    Выход
                                </span>
                            </a>

                        </ProfilePopup>
                    </div>

                </div>

            </header >

        </>
    );
}

export default observer(Header)

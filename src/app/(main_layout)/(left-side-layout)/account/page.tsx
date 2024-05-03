'use client'


import React, { useContext, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from './page.module.css'
import { Context } from "@/app/providers";
import useOutside from "@/hooks/useOutside";
import { FullScreenPopup } from "@/components/popup/main_popup/FullScreenPopup";
import LoginForm from "@/components/forms/login_form/LoginForm";
import { RegistrationForm } from "@/components/forms/reg_form/RegistrationForm";
import Link from "next/link";
import SettingsIcon from "@/components/icons/settings";
import UserIcon from "@/components/icons/user";
import LeaveIcon from "@/components/icons/leave";
import AuthCard from "@/components/cards/auth_card/AuthCard";



function Games() {
    const { auth_store } = useContext(Context);
    const [isAuthShow, setIsAuthShow] = useState(false);

    const popupRef = useRef(null)
    useOutside(popupRef, () => {

        if (isAuthShow) {
            setTimeout(() => setIsAuthShow(false), 50)
        }
     
    })
    return (
        <>

            <FullScreenPopup active={isAuthShow} setActive={setIsAuthShow}>
                <AuthCard setIsShow={setIsAuthShow}/>
            </FullScreenPopup>
            <main className="content_wrapper">
                <div className={styles.menu_items}>
                    {auth_store.isAuth ?
                        <Link href={'/' + auth_store.user.username} className={styles.username_item}>
                            <div className={styles.icon_wrapper}>
                                <UserIcon className='general-icon' />

                            </div>
                            <span>
                                {auth_store.user.full_name != null ? auth_store.user.full_name : auth_store.user.username}
                            </span>
                        </Link>
                        :
                        <div onClick={() => setIsAuthShow(true)} className={styles.username_item}>
                            <div className={styles.icon_wrapper}>
                                <UserIcon className='general-icon' />
                            </div>
                            <span>
                                Войти
                            </span>
                        </div>
                    }
                    {auth_store.isAuth ?
                        <Link href={'/settings'} className={styles.menu_item}>
                            <div className={styles.icon_wrapper}>
                                <SettingsIcon className="general-icon" />
                            </div>
                            <span>
                                Настройки
                            </span>
                        </Link>
                        : null}
                    {auth_store.isAuth ?
                        <Link href={'/'} onClick={() => { auth_store.logout() }} className={styles.menu_item}>
                            <div className={styles.icon_wrapper}>
                                <LeaveIcon className="general-icon" />
                            </div>
                            <span>
                                Выход
                            </span>
                        </Link> : null}
                </div>

            </main >

            <main className="right_side_wrapper">


            </main>

        </>

    );
}


export default observer(Games)
'use client'


import React, { useContext, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from './page.module.css'
import { Context } from "@/app/providers";
import useOutside from "@/hooks/useOutside";
import { FullScreenPopup } from "@/components/popup/FullScreenPopup";
import LoginForm from "@/components/forms/login_form/LoginForm";
import { RegistrationForm } from "@/components/forms/reg_form/RegistrationForm";
import Link from "next/link";



function Games() {
    const { auth_store } = useContext(Context);
    const [isAuthShow, setIsAuthShow] = useState(false);
    const [isRegShow, setIsRegShow] = useState(false);

    const popupRef = useRef(null)
    useOutside(popupRef, () => {

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
            <main className="content_wrapper">
                <div className={styles.menu_items}>
                    {auth_store.isAuth ?
                        <Link href={'/' + auth_store.user.username} className={styles.username_item}>
                            <div className={styles.user_icon}></div>
                            <span>
                                {auth_store.user.full_name != null ? auth_store.user.full_name : auth_store.user.username}
                            </span>
                        </Link>
                        :
                        <div onClick={() => setIsAuthShow(true)} className={styles.username_item}>
                            <div className={styles.user_icon}></div>
                            <span>
                                Войти
                            </span>
                        </div>
                    }
                    {auth_store.isAuth ?
                        <Link href={'/settings'} className={styles.menu_item}>
                            <div className={styles.settings_icon}></div>
                            <span>
                                Настройки
                            </span>
                        </Link>
                        : null}
                    {auth_store.isAuth ?
                        <Link href={'/'} onClick={() => { auth_store.logout() }} className={styles.menu_item}>
                            <div className={styles.leave_icon}></div>
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
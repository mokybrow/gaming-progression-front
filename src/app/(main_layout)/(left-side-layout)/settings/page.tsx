"use client"

import { Context } from "@/app/providers";
import { useContext, useEffect, useState } from "react";
import styles from './page.module.css'
import Link from "next/link";
import { observer } from "mobx-react-lite";



function Settings() {

    const { auth_store } = useContext(Context);

    return (
        <>
            <main className="content_wrapper">
                <div className={styles.main_wrapper}>
                    <div className={styles.settings_header}>
                        <span >Настройки</span>
                    </div>
                    <hr />
                    <div className={styles.settings_content}>

                        <Link className={styles.settings_menu_item} href={'/settings/me'}>
                            <div className={styles.user_icon}>
                            </div>
                            <div className={styles.text_wrapper}>
                                <span className={styles.point_header}>Обо мне</span>
                                <small>Имя, биография, день рождения</small>
                            </div>
                        </Link>

                        <Link className={styles.settings_menu_item} href={'/settings/security'}>
                            <div className={styles.lock_icon}>
                            </div>
                            <div className={styles.text_wrapper}>
                                <span className={styles.point_header}>Безопасность</span>
                                <small>Почта, пароль</small>
                            </div>
                        </Link>

                        <Link className={styles.settings_menu_item} href={'/settings/mailing'}>
                            <div className={styles.mailing_icon}>
                            </div>
                            <div className={styles.text_wrapper}>
                                <span className={styles.point_header}>Рассылка</span>
                                <small>Настройка рассылки, отписка от рассылки</small>
                            </div>
                        </Link>

                        {/* <div className={styles.settings_menu_item}>
                            <div className={styles.theme_icon}>
                            </div>
                            <span>Тема</span>
                        </div> */}
                    </div>
                </div>

            </main>
            <main className="right_side_wrapper">
           
            </main>

        </>
    );
}


export default observer(Settings)
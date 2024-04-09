"use client"

import { Context } from "@/app/providers";
import { usePathname } from "next/navigation";
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
            </main>

        </>
    );
}


export default observer(Settings)
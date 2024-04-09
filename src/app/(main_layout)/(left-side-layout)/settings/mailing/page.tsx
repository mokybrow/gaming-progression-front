"use client"

import { Context } from "@/app/providers";
import { useContext, useEffect } from "react";
import styles from './page.module.css'
import Link from "next/link";
import { FunctionalGameButton } from "@/components/buttons/FunctionalGameButton";


import { observer } from "mobx-react-lite";
import 'react-toastify/dist/ReactToastify.css';


const SettingsMailing = observer(() => {
    const { auth_store } = useContext(Context);

    useEffect(() => {

        auth_store.getMailingSettings()

    }, [auth_store])


    let points = [
        { id: "holiday", label: "Праздники", checked: auth_store.mailingSettings.some(o => o.type_data.name == "holiday") },
        { id: "news", label: "Обновления сайта", checked: auth_store.mailingSettings.some(o => o.type_data.name == "news") },
        { id: "important", label: "Важные события сообщества", checked: auth_store.mailingSettings.some(o => o.type_data.name == "important") },
    ];


    return (
        <>
            <main className="content_wrapper">
                <div className={styles.main_wrapper}>
                    <div className={styles.settings_header}>
                        <Link href={'/settings/'}>
                            <div className={styles.arrow_back}></div>
                            <span>Назад</span>
                        </Link>
                    </div>
                    <hr />
                    <div className={styles.settings_content}>
                        {points.map(item => (

                            <div key={item.id} className={styles.item_wrapper}>
                                {item.checked ? <>
                                    <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={14}
                                        onClick={() => auth_store.updateMailingSettings([item.id])}>
                                        Отписаться
                                    </FunctionalGameButton>
                                </> : <>
                                    <FunctionalGameButton type={'button'} bg_color={'#0368CD'} color={'#E8E8ED'} fontSize={14}
                                        onClick={() => auth_store.updateMailingSettings([item.id])}>
                                        Подписаться
                                    </FunctionalGameButton></>}
                                <span><strong>{item.label}</strong></span>


                            </div>
                        ))}

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
})

export default SettingsMailing;


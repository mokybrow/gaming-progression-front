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
          
            </main>

        </>
    );
})

export default SettingsMailing;


"use client"

import { Context } from "@/app/providers";
import { useContext, useEffect } from "react";
import styles from './page.module.css'
import Link from "next/link";
import { FunctionalGameButton } from "@/components/buttons/FunctionalGameButton";


import { observer } from "mobx-react-lite";
import ArrowLeftIcon from "@/components/icons/arrowLeft";
import CustomCheckbox from "@/components/fields/checkbox/CustomCheckbox";


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
            <main className="main_content_wrapper">
                <div className={styles.main_wrapper}>
                    <div className={styles.settings_header}>
                        <Link href={'/settings/'}>
                            <div className={styles.icon_wrapper}>
                                <ArrowLeftIcon className='general-icon' />
                            </div>
                            <span>Назад</span>
                        </Link>
                    </div>
                    <hr />
                    <div className={styles.settings_content}>
                        {points.map(item => (

                            <div key={item.id} className={styles.item_wrapper}>
                                <CustomCheckbox id={item.id} checked={item.checked} onClick={() => auth_store.updateMailingSettings([item.id])} labelname={item.label}/>
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


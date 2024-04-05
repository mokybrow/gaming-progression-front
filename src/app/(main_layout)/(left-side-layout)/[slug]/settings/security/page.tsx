"use client"

import { Context } from "@/app/providers";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import styles from './page.module.css'
import Link from "next/link";
import CommentField from "@/components/fields/comment/CommentField";
import { FunctionalGameButton } from "@/components/buttons/FunctionalGameButton";
import InputField from "@/components/fields/InputField";



export default function SettingsSecurity() {
    const [fullName, setFullName] = useState("");
    const [biography, setBiography] = useState("");

    const { auth_store } = useContext(Context);

    return (
        <>
            <main className="content_wrapper">
                <div className={styles.main_wrapper}>
                    <div className={styles.settings_header}>
                        <Link href={'/' + auth_store.user.username + '/settings/'}>
                            <div className={styles.arrow_back}></div>
                            <span>Назад</span>
                        </Link>
                    </div>
                    <hr />
                    <div className={styles.settings_content}>
                    <InputField placeholder={"Новый пароль"} type={"password"} id={"password"} labelname={"Новый пароль"} />

                        <div className={styles.comment_field_wrapper}>
                            <CommentField value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Отображаемое имя"
                                maxLength={25} />
                            {fullName !== "" && fullName.replace(/\s+/g, ' ').trim() !== "" ? <>

                                <div className={styles.send_button_wrapper}>
                                    <div>
                                        <small>{fullName.length}/25</small>
                                    </div>
                                    <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={12}
                                        onClick={() => (auth_store.patchMe(null, fullName, null, null, null), setFullName(''))}>
                                        Обновить
                                    </FunctionalGameButton>

                                </div>
                            </> : null}

                        </div>

                        <div className={styles.comment_field_wrapper}>
                            <CommentField value={biography}
                                onChange={(e) => setBiography(e.target.value)}
                                placeholder="Расскажите о себе"
                                maxLength={50} />
                            {biography !== "" && biography.replace(/\s+/g, ' ').trim() !== "" ? <>
                                <div className={styles.send_button_wrapper}>
                                    <div>
                                        <small>{biography.length}/50</small>
                                    </div>
                                    <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={12}
                                        onClick={() => (auth_store.patchMe(null, null, biography, null, null), setBiography(''))}>
                                        Обновить
                                    </FunctionalGameButton>
                                </div>
                            </> : null}
                        </div>
                    </div>
                </div>

            </main>
            <main className="right_side_wrapper">
                Ахаха
            </main>

        </>
    );
}

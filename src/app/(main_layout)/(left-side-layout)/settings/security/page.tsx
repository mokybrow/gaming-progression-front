"use client"

import { Context } from "@/app/providers";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import styles from './page.module.css'
import Link from "next/link";
import { FunctionalGameButton } from "@/components/buttons/FunctionalGameButton";
import * as yup from 'yup';

import { observer } from "mobx-react-lite";
import InputField from "@/components/fields/InputField";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowLeftIcon from "@/components/icons/arrowLeft";


function SettingsSecurity() {
    const [newEmail, setNewEmail] = useState("");
    const { auth_store } = useContext(Context);
    const notify = async () => {
        const response = await auth_store.changeEmailRequest(newEmail)
        if (response) {
            toast(`Вам направлена инструкция на почту ${auth_store.user.email}!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            setEmailOpen(false)

        }
        else {
            toast.warn('Вы уже используете данную почту!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Bounce,
            });
        }
    }

    const changePassNotify = async () => {
        const response = await auth_store.changePasswordRequest()
        if (response) {
            toast(`Вам направлена инструкция по смене пароля на почту ${auth_store.user.email}!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

        }

    }
    const [emailOpen, setEmailOpen] = useState(false);

    return (
        <>
            <main className="content_wrapper">
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
                        <div className={emailOpen ? styles.item_close : styles.item_wrapper}>
                            <span className={styles.item_wrapper_header}>Почта</span>
                            <span>{auth_store.user.email}</span>
                            <small className={styles.change_link_color} onClick={() => setEmailOpen(true)}>Изменить</small>
                        </div>
                        <div className={emailOpen ? styles.item_open : styles.item_close}>
                            <div className={styles.field_wrapper}>

                                <InputField placeholder={'Начните вводить'}
                                    value={newEmail}
                                    type={'text'} id={'email'} height={44} labelname={'Почта'}
                                    onChange={(e) => setNewEmail(e.target.value)} required />

                                <div className={styles.x_icon} onClick={() => (setEmailOpen(false), setNewEmail(''))}></div>
                            </div>
                            {newEmail !== "" && newEmail.replace(/\s+/g, ' ').trim() !== "" && newEmail.match(
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            ) ? <>
                                <div className={styles.send_button_wrapper}>

                                    <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={12}
                                        onClick={() => (setNewEmail(''), notify())}>
                                        Обновить
                                    </FunctionalGameButton>
                                </div>
                            </> : null}
                        </div>


                        <div className={styles.item_wrapper}>
                            <span className={styles.item_wrapper_header}>Пароль</span>
                            <span>****************</span>
                            <small className={styles.change_link_color} onClick={() => changePassNotify()}>Изменить</small>
                        </div>


                    </div>

                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light" />

            </main>
            <main className="right_side_wrapper">
         
            </main>

        </>
    );
}


export default observer(SettingsSecurity)
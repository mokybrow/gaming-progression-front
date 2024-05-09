"use client"

import { Context } from "@/app/providers";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import styles from './page.module.css'
import Link from "next/link";

import { observer } from "mobx-react-lite";
import InputField from "@/components/fields/input/InputField";
import ArrowLeftIcon from "@/components/icons/arrowLeft";
import ReactToast from "@/components/toast/Toast";
import CrossIcon from "@/components/icons/cross";
import ServiceButtonLong from "@/components/buttons/servicelong/ServiceButtonLong";
import AuthService from "@/services/authService";
import { AxiosError } from "axios";
import { ErrorModel } from "@/models/serviceModel";


function SettingsSecurity() {
    const [newEmail, setNewEmail] = useState("");
    const { auth_store } = useContext(Context);

    const [active, setActive] = useState(false)
    const [toastText, setToastText] = useState<string>('')

    const changeEmailRequest = async () => {

        AuthService.changeEmailRequest(newEmail).then(function (resp) {
            if (resp.status === 200) {
                setToastText(`Вам направлена инструкция на почту ${auth_store.user.email}!`)
                setActive(true)
            }
        }).catch(function (err: AxiosError<ErrorModel>) {
            
            if (err.response?.data.detail === 'This email are same') {
                setToastText(`Вы уже пользуетесь данной почтой`)
                setActive(true)
            }
            if (err.response?.data.detail === 'User with this email already exist') {
                setToastText(`Пользователь с такой почтой уже существует`)
                setActive(true)
            }
        })


    }

    const changePassNotify = async () => {
        const response = await auth_store.changePasswordRequest()
        if (response) {
            setToastText(`Вам направлена инструкция по смене пароля на почту ${auth_store.user.email}!`)
            setActive(true)
        }
    }
    const [emailOpen, setEmailOpen] = useState(false);

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
                        <div className={emailOpen ? styles.item_close : styles.item_wrapper}>
                            <span className={styles.item_wrapper_header}>Почта</span>
                            <span>{auth_store.user.email}</span>
                            <small className={styles.change_link_color} onClick={() => setEmailOpen(true)}>Изменить</small>
                        </div>
                        <div className={emailOpen ? styles.item_open : styles.item_close}>
                            <div className={styles.field_wrapper}>
                                <InputField
                                    value={newEmail}
                                    type={'text'} id={'email'} height={44} labelname={'Почта'}
                                    onChange={(e) => setNewEmail(e.target.value)} required />
                                <div className={styles.x_icon} onClick={() => (setEmailOpen(false), setNewEmail(''))}>
                                    <CrossIcon className="general-icon" />
                                </div>
                            </div>
                            {newEmail !== "" && newEmail.replace(/\s+/g, ' ').trim() !== "" && newEmail.match(
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            ) ? <>
                                <div className={styles.send_button_wrapper}>

                                    <ServiceButtonLong type={'button'}
                                        onClick={() => (setNewEmail(''), changeEmailRequest(), setEmailOpen(false))}>
                                        Обновить
                                    </ServiceButtonLong>
                                </div>
                            </>
                                : null}
                        </div>


                        <div className={styles.item_wrapper}>
                            <span className={styles.item_wrapper_header}>Пароль</span>
                            <span>****************</span>
                            <small className={styles.change_link_color} onClick={() => changePassNotify()}>Изменить</small>
                        </div>


                    </div>

                </div>
                <ReactToast timeout={5000} active={active} setActive={setActive} toastText={toastText} setToastText={setToastText} />


            </main>
            <main className="right_side_wrapper">

            </main>

        </>
    );
}


export default observer(SettingsSecurity)
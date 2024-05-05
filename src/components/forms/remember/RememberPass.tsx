"use client";


import { useContext, useState } from 'react';
import styles from './page.module.css'
import axios, { AxiosError } from 'axios';
import InputField from '@/components/fields/input/InputField';

import AuthService from '@/services/authService';
import { RegistrResponse } from '@/models/userModel';
import { useRouter } from 'next/navigation';
import { LoginButton } from '@/components/buttons/login/LoginButton';
import { Context } from '@/app/providers';


export function RememberForm() {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');

    const { auth_store } = useContext(Context);
    const router = useRouter();


    const handleFormSubmit = async () => {
        if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            setError('Неверный формат почты')
        }
        else {
            const response = await auth_store.passwordRecovery(email)
            if (!response) {
                setError('Пользователь с такой почтой не найден')
            }
            else {
                router.refresh()
            }


        }
    }

    function handleInputEmail(e: any) {
        setError('')
        setEmail(e.target.value);
    }




    return (
        <>
            <form autoComplete="on" className={styles.auth_form}>

                <InputField
                    type={'text'} id={'email'} labelname={'Почта'} onChange={(e) => handleInputEmail(e)} value={email} />
                {error != '' ?
                    <div className={styles.error_block}>
                        <span>{error}</span>
                    </div>
                    : null
                }

                <div className={styles.button_wrapper}>
                    <LoginButton type={'button'} onClick={() => handleFormSubmit()}>
                        Вспомнить пароль
                    </LoginButton>
                </div>

            </form>

        </>
    );
}

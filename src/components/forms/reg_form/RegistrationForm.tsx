"use client";

import { useContext, useState } from 'react';
import styles from './page.module.css'
import axios, { AxiosError } from 'axios';
import InputField from '@/components/fields/input/InputField';
import { SubmitButton } from '@/components/buttons/SubmitButton';

import AuthService from '@/services/authService';
import { RegistrResponse } from '@/models/userModel';
import { useRouter } from 'next/navigation';
import { LoginButton } from '@/components/buttons/login/LoginButton';


export function RegistrationForm() {
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const router = useRouter();



    const handleFormSubmit = async () => {

        if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            setError('Неверный формат почты')
            return
        }
        else if (password.length < 8) {
            setError('Придумайте пароль надёжнее')
            return

        }
        else {
            try {
                await AuthService.registration(username, email, password);
                router.refresh()

            } catch (e) {
                const error = e as AxiosError<RegistrResponse>;
                if (error.response?.data.detail == "A user with this email already exists") {
                    setError("Попробуйте другую почту")
                }
                if (error.response?.data.detail == "A user with the same username already exists") {
                    setError("Это имя пользователя уже занято")
                }
            }
        }
    }

    function handleInputEmail(e: any) {
        setError('')
        setEmail(e.target.value);
    }

    function handleInputUsername(e: any) {
        setError('')
        let text = e.target.value.replace(/[^a-z0-9_-]/gi, '');
        setUsername(text);
    }
    function handleInputPassword(e: any) {
        setError('')
        let text = e.target.value.replace(/[^a-z0-9$#%&-_]/gi, '');
        setPassword(text);
    }


    return (
        <>
            <form autoComplete="on" className={styles.auth_form}>

                <InputField
                    type={'text'} id={'email'} labelname={'Почта'} onChange={(e) => handleInputEmail(e)} value={email} />

                <InputField
                    type={'text'} id={'username'} labelname={'Имя пользователя'} onChange={(e) => handleInputUsername(e)} value={username} />

                <InputField
                    type={'password'} id={'password'} labelname={'Пароль'} onChange={(e) => handleInputPassword(e)} value={password} />
                {error != '' ?
                    <div className={styles.error_block}>
                        <span>{error}</span>
                    </div>
                    : null
                }

                <div className={styles.button_wrapper}>
                    <LoginButton type={'button'} onClick={() => handleFormSubmit()}>
                        Зарегистрироваться
                    </LoginButton>
                </div>

            </form>
        </>
    );
}

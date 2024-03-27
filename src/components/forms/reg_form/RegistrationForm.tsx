"use client";

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useState } from 'react';
import styles from './page.module.css'
import axios, { AxiosError } from 'axios';
import InputField from '@/components/fields/InputField';
import { SubmitButton } from '@/components/buttons/SubmitButton';
import $api, { API_URL } from '@/api/api';
import { Context } from '@/app/providers';
import AuthService from '@/services/authService';
import { RegistrResponse } from '@/models/userModel';
import { useRouter } from 'next/navigation';


let validationSchema = yup.object({
    username: yup.string().required('Обязательно введите имя пользователя'),
    email: yup.string().email('Неверный формат почты').required('Обязательно введите почту'),
    password: yup.string().required('Обязательно введите пароль').min(6, 'Пароль должен быть длиннее 6 символов').max(32, 'Пароль не должен быть длиннее 32 символов'),
});

export function RegistrationForm() {
    const [message, setMessage] = useState(null);
    const { setError, reset, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const router = useRouter();

    const handleFormSubmit = async (data: any) => {
        setMessage(null);
        try {
            const response = await AuthService.registration(data.username, data.email, data.password);

        } catch (e) {
            const error = e as AxiosError<RegistrResponse>;
            if (error.response?.data.detail == "A user with this email already exists") {
                setError('email', { message: "Попробуйте другую почту", type: "error" })

            }
            if (error.response?.data.detail == "A user with the same username already exists") {
                setError('username', { message: "Попробуйте другой логин", type: "error" })

            }

        }

    }

    return (
        <>
            <form onSubmit={handleSubmit(handleFormSubmit)} autoComplete="off" className={styles.auth_form}>

                <div className={styles.form_elem}>
                    <InputField {...register('email')} placeholder={'Начните вводить'}
                        type={'text'} id={'email'} width={280} height={44} labelname={'Почта'} />

                    {errors['email'] ? (
                        <div className={styles.errormsg}>{errors['email'].message}</div>
                    ) : null}
                </div>

                <div className={styles.form_elem}>

                    <InputField {...register('username')} placeholder={'Начните вводить'}
                        type={'text'} id={'username'} width={280} height={44} labelname={'Имя пользователя'} />
                    {errors['username'] ? (
                        <div className={styles.errormsg}>{errors['username'].message}</div>
                    ) : null}
                </div>
                <div className={styles.form_elem}>
                    <InputField {...register('password')} placeholder={'Начните вводить'}
                        type={'password'} id={'password'} width={280} height={44} labelname={'Пароль'} />

                    {errors['password'] ? (
                        <div className={styles.errormsg}>{errors['password'].message}</div>
                    ) : null}
                </div>

                <SubmitButton type={'submit'} width={280} height={44}>
                    Зарегистрироваться
                </SubmitButton>
            </form>
        </>
    );
}

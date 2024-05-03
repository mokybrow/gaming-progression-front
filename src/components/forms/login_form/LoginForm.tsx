'use client'

import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './page.module.css'
import Link from 'next/link';
import { useContext, useState } from 'react';
import { Context } from '@/app/providers';
import { SubmitButton } from '@/components/buttons/SubmitButton';
import InputField from '@/components/fields/input/InputField';
import { API_URL } from '@/api/api';
import { useRouter } from 'next/navigation';
import AuthService from '@/services/authService';
import { LoginButton } from '@/components/buttons/login/LoginButton';



export interface FormProps {
	setIsOpen: any,
	setRemember: any,
}

const LoginForm = ({ setIsOpen, setRemember }: FormProps) => {
	const { auth_store } = useContext(Context);
	const router = useRouter();

	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const [error, setError] = useState<string>('');

	const handleFormSubmit = async () => {
		if (username === '' || password === '') {
			setError('Заполните все поля')
		}
		else {
			try {
				const response = await auth_store.login(username, password)
				console.log(response)
				if (!response) {
					setError('Неверный логин или пароль')
				}
				else {
					router.refresh()
				}
			}
			catch {
			}
		}

	}

	return (<>
		{ }
		<form autoComplete="on" className={styles.auth_form}>
			<InputField type={'username'} id={'username'} labelname={'Имя пользователя'}
				autoComplete="username" value={username} onChange={(e) => (setUsername(e.target.value), setError(''), setRemember(false)
				)} />

			<InputField
				type={'password'} id={'password'} labelname={'Пароль'}
				autoComplete="current-password" value={password} onChange={(e) => (setPassword(e.target.value), setError(''), setRemember(false)
				)} />
			{error != '' ?
				<div className={styles.error_block}>
					<span>{error}</span>
				</div>
				: null
			}
			{error != '' ?
				<div className={styles.remember_pass_block} onClick={()=> setRemember(true)}>
					<span>Забыли пароль? Вспомнить.</span>
				</div>
				: null
			}
			<div className={styles.button_wrapper}>
				<LoginButton type={'button'} onClick={() => handleFormSubmit()}>
					Войти
				</LoginButton>
				<LoginButton type={'button'} onClick={() => ((setIsOpen(true), setRemember(false)))}>
					Зарегистрироваться
				</LoginButton>
			</div>
		</form>
	</>)
}

export default LoginForm;
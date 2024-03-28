'use client'

import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './page.module.css'
import Link from 'next/link';
import { useContext } from 'react';
import { Context } from '@/app/providers';
import { SubmitButton } from '@/components/buttons/SubmitButton';
import InputField from '@/components/fields/InputField';
import { API_URL } from '@/api/api';
import { useRouter } from 'next/navigation';
import AuthService from '@/services/authService';

let validationSchema = yup.object({
	username: yup.string().required(),
	password: yup.string().required()
});

const LoginForm = () => {
	const { auth_store } = useContext(Context);
	const router = useRouter();


	const { setError, reset, register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(validationSchema)
	});

	const handleFormSubmit = async (data: { username: any; password: any; }) => {
		try {
			const response = await AuthService.login(data.username, data.password);
			await auth_store.login(response);
			router.refresh()
		}
		catch {
			setError('username', { message: "Неверный логин или пароль", type: "error" })
		}

	}

	return (<>

		<form onSubmit={handleSubmit(handleFormSubmit)} autoComplete="on" className={styles.auth_form}>
			<div className={styles.form_elem}>
				<InputField {...register('username')} placeholder={'Начните вводить'}
					type={'username'} id={'username'} width={280} labelname={'Имя пользователя'} />

			</div>

			<div className={styles.form_elem}>
				<InputField {...register('password')} placeholder={'Начните вводить'}
					type={'password'} id={'password'} width={280} labelname={'Пароль'} />

				{errors['password'] ? (
					<div className={styles.errormsg}>{errors['password'].message}</div>
				) : null}
				{errors['username'] ? (
					<div className={styles.errormsg}>{errors['username'].message}</div>
				) : null}
		
			</div>


			<SubmitButton type={'submit'} width={280} height={44}>
				Войти
			</SubmitButton>

		</form>
	</>)
}

export default LoginForm;
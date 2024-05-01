'use client'
import AuthService from '@/services/authService'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './page.module.css'
import InputField from '@/components/fields/InputField'
import EyeIcon from '@/components/icons/eye'
import ClosedEyeIcon from '@/components/icons/closedEye'
import ServiceButton from '@/components/buttons/service/ServiceButton'
import ServiceButtonLong from '@/components/buttons/servicelong/ServiceButtonLong'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form'

let validationSchema = yup.object({
	password: yup.string().required().matches(/^[a-zA-Z0-9]+$/,
    "This field cannot contain white space and special character"),
	confirmPassword: yup.string().required()
});

export default function ChangePassword() {
    const searchParams = useSearchParams()
    const tokenParam = searchParams.get('token')
    const [token, setToken] = useState<string>(String(tokenParam))
    const [password, SetPassword] = useState<string>('')
    const [confirm, setConfirm] = useState<string>('')
    const [fieldType, setFieldType] = useState('password')
    const [danger, setDanger] = useState<string>()

	const { setError, reset, register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(validationSchema)
	});


    const changePassword = () => {
        if (password !== confirm) {
            setDanger('Пароли не совпадают')
        }
        else {

            AuthService.changePasswordReset(token, password).then(resp => resp.status !== 200 ? setDanger('Время действия токена истекло') : null)
        }
    }
    return (
        <main className="content_wrapper">
            <div className={styles.form_wrapper}>
                <InputField {...register('password')} placeholder={'Начните вводить'}
                    type={fieldType} id={'password'} width={280} labelname={'Пароль'}
                    autoComplete="password" onChange={(e) => SetPassword(e.target.value)} />
                <InputField {...register('confirmPassword')} placeholder={'Начните вводить'}
                    type={fieldType} id={'confirmPassword'} width={280} labelname={'Подтверждение пароля'}
                    autoComplete="confirmPassword" onChange={(e) => setConfirm(e.target.value)} />
                <div>
                    {danger}
                </div>
                {fieldType == 'password' ?

                    <div onClick={() => (setFieldType('text'))} className={styles.show_pass_wrapper}>
                        <span>Показать пароль</span>
                        <div className={styles.icon_wrapper}>
                            <EyeIcon className='general-icon' />
                        </div>
                    </div>
                    :
                    <div onClick={() => (setFieldType('password'))} className={styles.show_pass_wrapper}>
                        <span>Скрыть пароль</span>
                        <div className={styles.icon_wrapper}>
                            <ClosedEyeIcon className='general-icon' />
                        </div>
                    </div>
                }
                <div className={styles.buttons_wrapper}>
                    <ServiceButtonLong type={'submit'} onClick={() => changePassword()}>
                        Обновить пароль
                    </ServiceButtonLong>
                </div>
            </div>
        </main>
    );
}

'use client'

import AuthService from '@/services/authService'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useRef, useState } from 'react'
import styles from './page.module.css'
import InputField from '@/components/fields/input/InputField'
import EyeIcon from '@/components/icons/eye'
import ClosedEyeIcon from '@/components/icons/closedEye'
import ServiceButtonLong from '@/components/buttons/servicelong/ServiceButtonLong'



function ChangePassword() {
    const searchParams = useSearchParams()
    const tokenParam = searchParams.get('token')
    const [token, setToken] = useState<string>(String(tokenParam))

    const [password, SetPassword] = useState<string>('')


    const [confirm, setConfirm] = useState<string>('')

    const [fieldType, setFieldType] = useState('password')
    const [danger, setDanger] = useState<string>()
    const router = useRouter()



    const changePassword = () => {
        if (password !== confirm) {
            setDanger('Пароли не совпадают')
        }
        else if (password.length < 8) {
            setDanger('Пароль должен быть длиннее 8 символов')
        }
        else {
            AuthService.changePasswordReset(token, password).then(function (resp) {
                console.log(resp.status)
                if (resp.status === 200) {
                    router.push('/')
                }
                else {
                    setDanger('Время действия токена истекло')
                }
            })
        }
    }

    function handleInput(e: any) {
        setDanger('')
        let text = e.target.value.replace(/[^a-z0-9$@-]/gi, '');
        SetPassword(text);
    }
    function handleInputConfirm(e: any) {
        setDanger('')
        let text = e.target.value.replace(/[^a-z0-9$@-]/gi, '');
        setConfirm(text);
    }


    return (
        <>
            <main className="content_wrapper">
                <div className={styles.page_main}>


                    <div className={styles.form_wrapper}>
                        <InputField placeholder={'Начните вводить'}
                            type={fieldType} id={'password'} labelname={'Пароль'}
                            autoComplete="password" onChange={(e) => handleInput(e)} value={password} />
                        <InputField placeholder={'Начните вводить'}
                            type={fieldType} id={'confirmPassword'} labelname={'Подтверждение пароля'}
                            autoComplete="confirmPassword" onChange={(e) => handleInputConfirm(e)} value={confirm} />
                        <div className={styles.danger}>
                            <small>
                                {danger}

                            </small>
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
                        <ServiceButtonLong type={'submit'} onClick={() => changePassword()}>
                            Обновить пароль
                        </ServiceButtonLong>
                    </div>
                </div>
            </main>
        </>
    );
}

export default function ChangePasswordPage() {
    return (
        // You could have a loading skeleton as the `fallback` too
        <Suspense>
            <ChangePassword />
        </Suspense>
    )
}

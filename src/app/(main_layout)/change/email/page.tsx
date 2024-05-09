'use client'

import AuthService from '@/services/authService'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useRef, useState } from 'react'
import styles from './page.module.css'
import InputField from '@/components/fields/input/InputField'
import EyeIcon from '@/components/icons/eye'
import ClosedEyeIcon from '@/components/icons/closedEye'
import ServiceButtonLong from '@/components/buttons/servicelong/ServiceButtonLong'
import ReactToast from '@/components/toast/Toast'



function ChangeEmail() {
    const searchParams = useSearchParams()
    const tokenParam = searchParams.get('token')
    const [token, setToken] = useState<string>(String(tokenParam))


    const [active, setActive] = useState(false)
    const [toastText, setToastText] = useState<string>('')

    useEffect(() => {
        AuthService.changeEmail(token).then(function (resp) {
            if (resp.status === 200) {
                setToastText(`Почта успешно изменена`)
                setActive(true)
            }
        }).catch(err => (
            setToastText('Время действия ссылки истекло'),
            setActive(true)
        ))

    }, [])

    return (
        <>
            <main className="main_content_wrapper" >
                <ReactToast timeout={5000} active={active} setActive={setActive} toastText={toastText} setToastText={setToastText} />

            </main>
        </>
    );
}

export default function ChangeEmailPage() {
    return (
        // You could have a loading skeleton as the `fallback` too
        <Suspense>
            <ChangeEmail />
        </Suspense>
    )
}

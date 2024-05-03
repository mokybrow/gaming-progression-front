

import CrossIcon from '@/components/icons/cross'
import styles from './auth.card.module.css'
import LoginForm from '@/components/forms/login_form/LoginForm'
import { useState } from 'react'
import { RegistrationForm } from '@/components/forms/reg_form/RegistrationForm'
import ArrowLeftIcon from '@/components/icons/arrowLeft'
import { RememberForm } from '@/components/forms/remember/RememberPass'

export interface ModalProps {
    setIsShow: any,

}

function AuthCard({ setIsShow }: ModalProps) {

    const [isOpen, setIsOpen] = useState(false)
    const [remember, setRemember] = useState(false)

    return (
        <div className={styles.card_wrapper}>
            <div className={styles.card_header}>
                {isOpen || remember ?
                    <div className={styles.icon_wrapper} onClick={() => (setIsOpen(false), setRemember(false))}>
                        <ArrowLeftIcon className='general-icon' />
                    </div>
                    : null}

                <div className={styles.exit_button} >
                    <div onClick={() => (setIsShow(false))} className={styles.cross_icon}>
                        <CrossIcon className='general-icon' />
                    </div>
                </div>
            </div>
            <div className={styles.brand_header}>
                <div>mbrw ID </div>
                {!isOpen ? <div>Вход в аккаунт</div> : <div>Регистрация</div>}

            </div>
            {!isOpen && remember ?
                <RememberForm />
                : !remember && !isOpen ?

                    < LoginForm setIsOpen={setIsOpen} setRemember={setRemember} />
                    :
                    <RegistrationForm />
            }

        </div>
    )
}

export default AuthCard
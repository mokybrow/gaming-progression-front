'use client'
import { useState } from 'react';
import styles from './popup.module.css'

export interface ModalProps {
    active: boolean,
    children: any,
    innerRef: any,
    setIsShow: any
}

export function MenuPopup({ active, children, setIsShow, innerRef, ...rest }: ModalProps) {

    if (active) {
        if (typeof document !== 'undefined') {
            const body = document.body;
            body.style.height = '100vh';
            body.style.overflowY = 'hidden';

        }
    } else {
        if (typeof document !== 'undefined') {
            const body = document.body;
            body.style.position = '';
            body.style.top = '';
            body.style.height = '';
            body.style.overflowY = '';
        }
    }
    return (
        <div className={active ? 'bottom_popup_content active_content' : 'bottom_popup_content'}>

            <div className={active ? "bottom_popup menu_active" : "bottom_popup"}
                ref={innerRef} {...rest}>
                <div className={styles.exit_button_wrapper}>
                    <div className={styles.exit_button} onClick={() => setIsShow(false)}>
                    </div>
                </div>
                {children}
            </div>
        </div>

    )

}

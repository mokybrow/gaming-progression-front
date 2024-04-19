'use client'

import { useEffect, useRef, useState } from 'react';
import styles from './fullpop.module.css'
import { observer } from 'mobx-react-lite';


export interface ModalProps {
    active: boolean,
    children: any,
    setActive: any,
}

export const PostPopUp = observer(({ active, children, setActive, ...rest }: ModalProps) => {

    if (active) {
            console.log('Запрещаем')
            document.body.style.position = 'fixed'
            document.body.style.width = '100vw'
           
        

    } else {
            console.log('Разрешаем')
            document.body.style.position = ''
            document.body.style.width = ''

        
    }

    return (
        <div className={active ? styles.modal_window_wrapper : styles.modal_window_wrapper_closed}
            onClick={e => (e.stopPropagation(), setActive(false))} onScroll={e => e.stopPropagation()}>
            <div className={styles.modal_content} onClick={e => e.stopPropagation()}  >
                {children}
            </div>
        </div>

    )


})



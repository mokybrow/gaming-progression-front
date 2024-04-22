'use client'

import { useEffect, useRef, useState } from 'react';
import styles from './repostpopup.module.css'
import { observer } from 'mobx-react-lite';


export interface ModalProps {
    active: boolean,
    children: any,
    setActive: any,
}

function RepostPopUp({ active, children, setActive, ...rest }: ModalProps) {

    if (active) {
        if (typeof document !== 'undefined') {

            document.body.style.overflow = 'hidden'
        }

    } else {
        if (typeof document !== 'undefined') {

            document.body.style.overflow = ''
        }

    }

    return (
        <div className={active ? styles.modal_window_wrapper : styles.modal_window_wrapper_closed}
            onClick={e => (e.stopPropagation(), setActive(false))} onScroll={e => e.stopPropagation()}>
            <div className={styles.modal_content} onClick={e => e.stopPropagation()}  >
                {children}
            </div>
        </div>

    )


}


export default observer(RepostPopUp)
'use client'

import { useEffect, useRef, useState } from 'react';
import styles from './fullpop.module.css'


export interface ModalProps {
    active: boolean,
    children: any,
    setActive: any,
}

export function MakeRepostPopup({ active, children, setActive, ...rest }: ModalProps) {
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

    const [offset, setOffset] = useState(0)

    useEffect(() => {
        if (typeof document !== 'undefined') {
            const menu = document.getElementById('content_height')

            console.log(menu?.scrollHeight)
            console.log(window.innerHeight)
            if (window.innerHeight < Number(menu?.scrollHeight)){

                setOffset(Number(menu?.scrollHeight) - window.innerHeight - 500 )
            }
        }

    }, []);


    return (
        <div className={active ? styles.modal_window_wrapper : styles.modal_window_wrapper_closed}
            onClick={e => (e.stopPropagation(), setActive(false))} onScroll={e => e.stopPropagation()}>
            <div className={styles.modal_content} onClick={e => e.stopPropagation()} id="content_height"
                style={{ top: `${offset}px` }}>
                {children}
            </div>
        </div>

    )

}

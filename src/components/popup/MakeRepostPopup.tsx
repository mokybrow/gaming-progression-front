'use client'

import { useEffect, useRef, useState } from 'react';
import styles from './fullpop.module.css'
import { observer } from 'mobx-react-lite';


export interface ModalProps {
    active: boolean,
    children: any,
    setActive: any,
}

function MakeRepostPopup({ active, children, setActive, ...rest }: ModalProps) {


    if (active) {
        if (typeof document !== 'undefined') {
            const body = document.body;
            body.style.height = '100vh';
            body.style.overflowY = 'hidden';

            const menu = document.getElementById('content_height')
            
            if (window.innerHeight > Number(menu?.scrollHeight)) {
                // console.log('Высота скрола', menu?.scrollHeight)
                // console.log('Высота окна', window.innerHeight)
                return (
                    <div className={active ? styles.modal_window_wrapper : styles.modal_window_wrapper_closed}
                        onClick={e => (e.stopPropagation(), setActive(false))} onScroll={e => e.stopPropagation()}
                        style={{ alignItems: `center` }}>
                        <div className={styles.modal_content} onClick={e => e.stopPropagation()} id="content_height"
                        >
                            {children}
                        </div>
                    </div>
    
                )
            }
            else {
                // console.log('Высота скрола', menu?.scrollHeight)
                // console.log('Высота окна', window.innerHeight)
                return (
                    <div className={active ? styles.modal_window_wrapper : styles.modal_window_wrapper_closed}
                        onClick={e => (e.stopPropagation(), setActive(false))} onScroll={e => e.stopPropagation()}
                        style={{ alignItems: `flex-start` }}>
                        <div className={styles.modal_content} onClick={e => e.stopPropagation()} id="content_height"
                        >
                            {children}
                        </div>
                    </div>
    
                )
            }

        
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

}


export default observer(MakeRepostPopup)
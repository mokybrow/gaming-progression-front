'use client'
import { useState } from 'react';
import styles from './popup.module.css'
import CrossIcon from '../icons/cross';


export interface ModalProps {
    active: boolean,
    children: any,
    setActive: any,
}

export function FullScreenPopup({ active, children, setActive, ...rest }: ModalProps) {
    const [isShow, setIsShow] = useState(false);
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
        <div className={active ? 'modal activemodal' : 'modal'}
            onClick={() => setActive(false)}>
            <div className={styles.exit_button_wrapper}>
                <div className={styles.exit_button} onClick={() => setIsShow(false)}>
                    <CrossIcon className='general-icon' />
                </div>
            </div>
            <div className={active ? 'modal_content activemodal' : 'modal_content'} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>

    )

}

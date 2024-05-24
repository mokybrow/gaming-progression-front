import React, { useState, forwardRef, useImperativeHandle } from "react"
import styles from './toast.module.css'
import CrossIcon from "../icons/cross";


export interface ModalProps {
    active: boolean,
    setActive: any,
    timeout: number,
    toastText: string,
    setToastText: any
}

function ReactToast({ timeout, toastText, active, setActive, setToastText }: ModalProps) {

    if (active) {
        setTimeout(() => {
            setActive(false)
            setToastText('')
        }, timeout);
    }


    return (

        <div className={active ? styles.react_toast_container : styles.react_toast_container_hide}>
            <div>
            {toastText}
            </div>
            <div className={styles.card_header}>
                <div className={styles.exit_button} >
                    <div onClick={() => (setActive(false))} className={styles.cross_icon}>
                        <CrossIcon className='general-icon' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReactToast
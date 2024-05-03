import React, { useState, forwardRef, useImperativeHandle } from "react"
import styles from './toast.module.css'


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
            console.log("Hello, World!");
            setActive(false)
            setToastText('')
        }, timeout);
    }


    return (
        <div className={active ? styles.toast_wrapper : styles.react_toast_container_hide}>

            <div className={active ? styles.react_toast_container : styles.react_toast_container_hide}>
                {toastText}
            </div>
        </div>
    )
}

export default ReactToast
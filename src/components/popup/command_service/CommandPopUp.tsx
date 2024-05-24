'use client'

import styles from './popup.module.css'

export interface ModalProps {
    active: boolean,
    children: any,
    innerRef: any
}

export function CommandPopUp({ active, children, innerRef, ...rest }: ModalProps) {

    if (!active) return null;
    return (
        <div className={active ? styles.modal_content_active : styles.modal_hide}
            onClick={e => e.stopPropagation()}
            ref={innerRef} {...rest}>
            {children}
        </div>

    )

}

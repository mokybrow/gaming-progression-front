'use client'

import styles from './search.popup.module.css'

export interface ModalProps {
    active: boolean,
    children: any,
    innerRef: any
}

export function SearchPopup({ active, children, innerRef, ...rest }: ModalProps) {

    if (!active) return null;
    return (
        <div className={active ? styles.modal_content_active : styles.modal_hide}
            onClick={e => e.stopPropagation()}
            ref={innerRef} {...rest}>
            {children}
        </div>

    )

}

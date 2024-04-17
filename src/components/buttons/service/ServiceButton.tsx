'use client'

import { ButtonHTMLAttributes } from 'react';
import styles from './button.module.css'


import { observer } from 'mobx-react';


export interface ButtonsProps {
    type: string
    width?: number
    height?: number
    children: any
}
export type TypeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonsProps

function ServiceButton({ type, children, ...rest }: TypeButtonProps) {

	return (
		<button type={type} className={styles.service_button} {...rest}>
			{children}
		</button>
	)

}

export default observer(ServiceButton)
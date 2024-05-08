'use client'

import { ButtonHTMLAttributes } from 'react';
import styles from './button.module.css'


import { observer } from 'mobx-react';


export interface ButtonsProps {
    type: string
    children: any
	active: boolean

}
export type TypeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonsProps

function WishButton({ type, children,active, ...rest }: TypeButtonProps) {

	return (
		<button type={type} className={active ? styles.active_button : styles.inactive_button} {...rest}>
			{children}
		</button>
	)

}

export default observer(WishButton)
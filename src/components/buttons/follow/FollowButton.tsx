'use client'

import { ButtonHTMLAttributes } from 'react';
import styles from './button.module.css'


import { observer } from 'mobx-react';


export interface ButtonsProps {
	follow: boolean
    type: string
    width?: number
    height?: number
    children: any
}
export type TypeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonsProps

function FollowButton({ follow, type, children, ...rest }: TypeButtonProps) {

	return (
		<button type={type} className={follow ? styles.follow_button_active : styles.follow_button} {...rest}>
			{children}
		</button>
	)

}

export default observer(FollowButton)
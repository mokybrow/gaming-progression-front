import styles from './button.module.css'
import { TypeButtonProps } from './button.type'


export function LoginButton({ type, children, ...rest }: TypeButtonProps) {
	return (
		<button type={type} className={styles.button} {...rest}>
			{children}
		</button>
	)
}

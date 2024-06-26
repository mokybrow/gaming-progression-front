import styles from './button.module.css'
import { TypeButtonProps } from './button.type'


export function UserProfileButton({ type, children, width, height, ...rest }: TypeButtonProps) {
	return (
		<button type={type} className={styles.profile_button} {...rest}
		style={{ width: `${width}px`, height: `${height}px` }}>
			{children}
		</button>
	)
}

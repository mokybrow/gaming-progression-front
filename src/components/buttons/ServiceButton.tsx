import styles from './service.button.module.css'
import { TypeButtonProps } from './button.type'


export function ServiceButton({ type, children, width, height, ...rest }: TypeButtonProps) {
	return (
		<button type={type} className={styles.service_button} {...rest}
		style={{ width: `${width}px`, height: `${height}px`}}>
			{children}
		</button>
	)
}

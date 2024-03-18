import styles from './button.module.css'
import { FuncTypeButtonProps } from './funcbutton.type'


export function FunctionalGameButton({ type, children, width, height, bg_color, fontSize, ...rest }: FuncTypeButtonProps) {
	return (
		<button type={type} className={styles.func_button} {...rest}
		style={{ width: `${width}px`, height: `${height}px`, backgroundColor: bg_color, fontSize:fontSize }}>
			{children}
		</button>
	)
}

import styles from './mention.module.css'
import { MentionTypeButtonProps } from './mentionbutton.type'


export function MentionButton({ type, children,  ...rest }: MentionTypeButtonProps) {
	return (
		<button type={type} className={styles.func_button} {...rest}>
			{children}
		</button>
	)
}

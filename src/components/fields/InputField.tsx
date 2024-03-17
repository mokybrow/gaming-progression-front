import { forwardRef } from 'react'
import styles from './field.module.css'
import { TypeInputProps } from './field.type'


const InputField = forwardRef<HTMLInputElement, TypeInputProps>(
	({ type, placeholder, id, width,height, labelname, ...rest }, ref) => {
		return (
			<div className={styles.input_wrapper}>
				<input ref={ref} {...rest} className={styles.form_input}
					type={type} 
					id={id} style={{ width: `${width}px`, height: `${height}px` }} required />
				<label htmlFor={id}>{labelname}</label>

			</div>
		)
	}
)

InputField.displayName = 'InputField'

export default InputField
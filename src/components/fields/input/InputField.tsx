import { forwardRef } from 'react'
import styles from './field.module.css'
import { TypeInputProps } from './field.type'


const InputField = forwardRef<HTMLInputElement, TypeInputProps>(
	({ type, id,  labelname, ...rest }, ref) => {
		return (
			<div className={styles.input_wrapper}>
				<input ref={ref} {...rest} className={styles.form_input}
					type={type} 
					id={id}  required />
				<label htmlFor={id}>{labelname}</label>

			</div>
		)
	}
)

InputField.displayName = 'InputField'

export default InputField
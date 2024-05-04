import { forwardRef } from 'react'
import styles from './field.module.css'
import { TypeInputProps } from './field.type'


const CustomCheckbox = forwardRef<HTMLInputElement, TypeInputProps>(
    ({ id, labelname, ...rest }, ref) => {
        return (
            <>

                <div className={styles.checkbox_wrapper}>
                    <input
                        className={styles.custom_checkbox}
                        type="checkbox"
                        id={id} ref={ref} {...rest}/>
                        <label htmlFor={id}>{labelname}</label>
                </div>
            </>
        )
    }
)

CustomCheckbox.displayName = 'CustomCheckbox'

export default CustomCheckbox
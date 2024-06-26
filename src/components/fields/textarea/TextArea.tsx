import { ComponentProps, FC } from "react";
import styles from "./textarea.module.css";

const TextAreaField: FC<ComponentProps<"textarea">> = ({ value, ...rest }) => {

    return (
        <div className={styles.textarea}>
            <div className={styles.textarea_control} data-view="fake">
                {value}
                <br />
            </div>
            <textarea
                {...rest}
                className={styles.textarea_control}
                data-view="native"
                value={value}
            />
        </div>
    );
};

export default TextAreaField
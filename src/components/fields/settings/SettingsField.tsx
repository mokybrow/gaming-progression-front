import { ComponentProps, FC } from "react";
import styles from "./settings.module.css";

const SettingsField: FC<ComponentProps<"textarea">> = ({ value, ...rest }) => {

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

export default SettingsField
import styles from './load.module.css'

const CircleLoader = () => {
    return (
        <div className={styles.loader_wrapper}>

            <span className={styles.loader}></span>

        </div>
    )
}

export default CircleLoader;

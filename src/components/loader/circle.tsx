import styles from './loade.module.css'

const CircleLoader = () => {
    return (
        <div className={styles.loader_wrapper}>

        <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default CircleLoader;

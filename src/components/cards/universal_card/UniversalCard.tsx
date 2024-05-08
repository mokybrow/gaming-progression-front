import { observer } from 'mobx-react-lite'
import styles from './userprofile.module.css'
import CrossIcon from '@/components/icons/cross'


export interface CardProps {
    children: any
    setIsShow: any
}

function UniversalCard({ children, setIsShow }: CardProps) {

    return (
        <div className={styles.user_card_wrapper}>
            <div className={styles.card_header}>
         
                <div className={styles.exit_button} >
                    <div onClick={() => (setIsShow(false))} className={styles.cross_icon}>
                        <CrossIcon className='general-icon' />
                    </div>
                </div>
            </div>
            {children}
        </div >
    )

}


export default observer(UniversalCard)
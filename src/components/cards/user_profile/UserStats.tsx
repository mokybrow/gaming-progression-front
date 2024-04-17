





import { observer } from 'mobx-react-lite'
import styles from './userprofile.module.css'
import { UserActivity, UserFavorite } from '@/models/userModel'




export interface CardProps {

    activity: UserActivity[]
    favorite: UserFavorite[]

}

function UserStatsCard({ activity, favorite }: CardProps) {

    return (

        <div className={styles.stat_card_icons}>
            <div className={styles.stats_button}>
                <div className={styles.rocket_logo}></div>
                <div>{activity?.filter(function (el) { return el.activity_data.code === 200000 }).length}</div>
            </div>
            <div className={styles.stats_button}>
                <div className={styles.finish_logo}></div>
                <div>{activity?.filter(function (el) { return el.activity_data.code === 220000 }).length}</div>

            </div>
            <div className={styles.stats_button}>
                <div className={styles.heart_logo}></div>
                <div>{favorite?.length}</div>

            </div>
            <div className={styles.stats_button}>
                <div className={styles.bag_logo}></div>
                <div>{activity?.filter(function (el) { return el.activity_data.code === 210000 }).length}</div>
            </div>
        </div>

    )

}

export default observer(UserStatsCard)
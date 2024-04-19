import { observer } from 'mobx-react-lite'
import styles from './userprofile.module.css'
import { UserActivity, UserFavorite } from '@/models/userModel'
import { FormattedDate } from 'react-intl'
import ServiceButton from '@/components/buttons/service/ServiceButton'
import ReportIcon from '@/components/icons/reportFlag'
import FollowButton from '@/components/buttons/follow/FollowButton'
import UserStatsCard from '@/components/cards/user_profile/UserStats'
import { useContext, useState } from 'react'
import { Context } from '@/app/providers'



export interface CardProps {
    username: string
    fullName: string
    biorgaphy: string
    createdAt: string
    activity: UserActivity[]
    favorite: UserFavorite[]
    followersCount: number
    subscriptionsCount: number
    isOwner: boolean
    isFollow?: boolean
}

function UserProfileCard({ username, fullName, biorgaphy, createdAt, activity, favorite, followersCount, subscriptionsCount, isOwner, isFollow }: CardProps) {
    const { auth_store } = useContext(Context);
    const { user_store } = useContext(Context);
    const [follow, setFollow] = useState(false)

    const followHandler = () => {
        auth_store.followOnUser(user_store.user.id)
        auth_store.user.subscriptions.push(...[{ sub_data: { id: user_store.user.id, username: user_store.user.username, full_name: user_store.user.full_name } }])
    }
    const unFollowHandler = () => {
        auth_store.followOnUser(user_store.user.id)
        const index = auth_store.user.subscriptions.findIndex(n => n.sub_data.username === username);
        if (index !== -1) {
            auth_store.user.subscriptions.splice(index, 1);
        }
    }

    return (
        <div className={styles.user_card_wrapper}>
            <div className={styles.general_user_info}>
                {fullName != null ?
                    <span className={styles.user_full_name}>
                        {fullName}
                    </span>
                    :
                    <span className={styles.user_full_name}>
                        {username}
                    </span>
                }
                <div className={styles.user_reg_wrapper}>
                    <span>На борту с </span>
                    {auth_store.isLoading || user_store.isLoading ? null :

                        <FormattedDate
                            value={createdAt}
                            year='numeric'
                            month='short'
                            day='numeric' />
                    }
                </div>
            </div>
            <div className={styles.service_block}>
                <div className={styles.buttons_wrapper}>

                    {!isOwner ?
                        <>
                            {!isFollow && !follow ?
                                <FollowButton type={'button'} follow={false} onClick={() => (followHandler(), setFollow(true))}>
                                    <span>Отслеживать</span>
                                </FollowButton>
                                :
                                <FollowButton type={'button'} follow={true} onClick={() => (unFollowHandler(), setFollow(false))}>
                                    <span>Отписаться</span>
                                </FollowButton>
                            }
                            <ServiceButton type={'button'}>
                                <ReportIcon className='general-icon' />
                            </ServiceButton>
                        </>
                        : null}

                </div>
            </div>
            <div className={styles.user_biography}>
                <span>
                    {biorgaphy}
                </span>
            </div>
            <div className={styles.border_line}>
            </div>
            <div className={styles.user_stats_wrapper}>
                <UserStatsCard activity={activity} favorite={favorite} />
            </div>

        </div >
    )

}


export default observer(UserProfileCard)
'use client'

import { usePathname, useRouter, useSelectedLayoutSegment } from 'next/navigation'
import styles from './page.module.css'
import { useContext, useEffect } from 'react';
import { Context } from '@/app/providers';
import { observer } from 'mobx-react-lite';
import { FunctionalGameButton } from '@/components/buttons/FunctionalGameButton';
import SkeletonLoader from '@/components/loader/loader';


function GamePage() {
    const pathname = usePathname()
    const router = useRouter();

    const { games_store } = useContext(Context);
    const { auth_store } = useContext(Context);

    const findStatusStart = auth_store.user.user_activity?.find(product => product.game_data.id == games_store.gamePage.id && product.activity_data.code == 200000)
    const findStatusWish = auth_store.user.user_activity?.find(product => product.game_data.id == games_store.gamePage.id && product.activity_data.code == 210000)
    const findStatusComplete = auth_store.user.user_activity?.find(product => product.game_data.id == games_store.gamePage.id && product.activity_data.code == 220000)
    const findStatusFavorite = auth_store.user.user_favorite?.find(product => product.game_data.id == games_store.gamePage.id)


    useEffect(() => {
        games_store.setLoading(true)
        games_store.getGamePage(pathname.substring(pathname.lastIndexOf('/') + 1))
        auth_store.checkAuth()

    }, [games_store, auth_store])

    
    const changeGameStatus = (activityType: string) => {
        auth_store.changeGameStatus(games_store.gamePage.id, activityType)
    }
    const addGameToFavorite = () => {
        auth_store.addGameToFavorite(games_store.gamePage.id)
    }
    return (
            <>
                <main className="content_wrapper">
                    <div className={styles.main_info_wrapper}>
                        <div className={styles.cover_wrapper}>
                            <img src={games_store.gamePage.cover} alt={games_store.gamePage.title} className={styles.game_cover} />
                        </div>
                        <div className={styles.right_side}>
                            <div className={styles.title_wrapper}>
                                <h1>
                                    {games_store.gamePage.title}
                                </h1>
                                <span>
                                    {games_store.gamePage.release_date}
                                </span>

                            </div>
                            <div className={styles.active_button_wrapper}>


                                <FunctionalGameButton type={'button'} bg_color={findStatusStart ? '#FFFAA3' : '#D6D6D6'} onClick={() => { !auth_store.isAuth ? router.push('/sign-in') : changeGameStatus('start') }} fontSize={20}>
                                    <div className={styles.button_data_wrapper}>
                                        <div className={styles.rocket_logo}></div>
                                        <span>Начал</span>
                                    </div>
                                </FunctionalGameButton>
                                <FunctionalGameButton type={'button'} bg_color={findStatusComplete ? '#97E88A' : '#D6D6D6'} fontSize={20} onClick={() => { !auth_store.isAuth ? router.push('/sign-in') : changeGameStatus('complete') }}>
                                    <div className={styles.button_data_wrapper}>
                                        <div className={styles.finish_logo}></div>
                                        <span>Прошёл</span>
                                    </div>
                                </FunctionalGameButton>
                                <FunctionalGameButton type={'button'} bg_color={findStatusFavorite ? '#FFC0BA' : '#D6D6D6'} fontSize={20} onClick={() => { !auth_store.isAuth ? router.push('/sign-in') : addGameToFavorite() }}>
                                    <div className={styles.button_data_wrapper}>
                                        <div className={styles.heart_logo}></div>
                                        <span>Любимая</span>
                                    </div>
                                </FunctionalGameButton>
                                <FunctionalGameButton type={'button'} bg_color={findStatusWish ? '#58B0CF' : '#D6D6D6'} fontSize={20} onClick={() => { !auth_store.isAuth ? router.push('/sign-in') : changeGameStatus('wish') }}>
                                    <div className={styles.button_data_wrapper}>
                                        <div className={styles.bag_logo}></div>
                                        <span>Отложил</span>
                                    </div>
                                </FunctionalGameButton>

                            </div>

                        </div>
                    </div>
                    <div className={styles.game_description}>
                        <span className={styles.block_header}>Об игре</span>
                        <span>
                            {games_store.gamePage.description !== null ? games_store.gamePage.description :

                                <>Информаци пока нет</>}
                        </span>
                    </div>
                </main >

                <main className="right_side_wrapper">
                    <div className={styles.information_card_wrapper}>
                        <div className={styles.other_info_card}>
                            <h4>Жанр</h4>
                            <div className={styles.information_text}>
                                {games_store.gamePage.genres?.map((genre, index) =>
                                    <span key={genre.genre.id}>
                                        {genre.genre.name + ((games_store.gamePage.genres.length > 0 && index !== games_store.gamePage.genres.length - 1) ? ', ' : '')}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className={styles.other_info_card}>
                            <h4>Платформа</h4>
                            <div className={styles.information_text}>
                                {games_store.gamePage.platforms?.map((platform, index) =>
                                    <span key={platform.platform.id}>
                                        {platform.platform.platform_name + ((games_store.gamePage.platforms.length > 0 && index !== games_store.gamePage.platforms.length - 1) ? ', ' : '')}
                                    </span>
                                )}
                            </div>
                        </div>
                        <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={20} onClick={() => console.log('ахах')}>
                            <div className={styles.button_data_wrapper}>
                                {/* <div className={styles.bag_logo}></div> */}
                                <span>Оценить игру</span>
                            </div>
                        </FunctionalGameButton>
                    </div>

                </main>

            </>

        );
}

export default observer(GamePage)
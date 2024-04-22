'use client'

import { usePathname } from 'next/navigation'
import styles from './page.module.css'
import { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '@/app/providers';
import { observer } from 'mobx-react-lite';
import { FunctionalGameButton } from '@/components/buttons/FunctionalGameButton';
import useOutside from '@/hooks/useOutside';
import LoginForm from '@/components/forms/login_form/LoginForm';
import { FullScreenPopup } from '@/components/popup/FullScreenPopup';
import ReactMarkdown from "react-markdown";

import { Mention } from 'primereact/mention';

import Link from 'next/link';
import LikeIcon from '@/components/icons/like';
import { SearchUserModel } from '@/models/userModel';
import CircleLoader from '@/components/loader/circle';
import CommentField from '@/components/fields/comment/CommentField';
import CommentCard from '@/components/cards/comment/CommentCard';
import { formatDate } from '@/services/dateFormat';


function GamePage() {
    const pathname = usePathname()
    const [isShow, setIsShow] = useState(false);
    const [isShowRating, setIsShowRating] = useState(false);
    const popupRef = useRef(null)

    const [rating, setRating] = useState<number>(0);
    const [hover, setHover] = useState<number>(0);
    const [showComment, setShowComment] = useState(false)

    const [rateButtonCount, setRateButtonCount] = useState<number>(0);

    const { games_store } = useContext(Context);
    const { auth_store } = useContext(Context);
    const { content_store } = useContext(Context);

    useOutside(popupRef, () => {
        if (isShow) {
            setTimeout(() => setIsShow(false), 50)
        }
        if (isShowRating) {
            setTimeout(() => setIsShowRating(false), 50)
        }

    })


    const findStatusStart = auth_store.user.user_activity?.find(product => product.game_data.id == games_store.gamePage.id && product.activity_data.code == 200000)
    const findStatusWish = auth_store.user.user_activity?.find(product => product.game_data.id == games_store.gamePage.id && product.activity_data.code == 210000)
    const findStatusComplete = auth_store.user.user_activity?.find(product => product.game_data.id == games_store.gamePage.id && product.activity_data.code == 220000)
    const findStatusFavorite = auth_store.user.user_favorite?.find(product => product.game_data.id == games_store.gamePage.id)



    useEffect(() => {
        games_store.getGamePage(pathname.substring(pathname.lastIndexOf('/') + 1))

    }, [games_store, auth_store])


    const changeGameStatus = (activityType: string) => {
        auth_store.changeGameStatus(games_store.gamePage.id, activityType)
    }
    const addGameToFavorite = () => {
        auth_store.addGameToFavorite(games_store.gamePage.id)
    }



    return (
        <>
            {games_store.isLoading ? <><div className='loader_wrapper'>
                <CircleLoader />
            </div></> : null}
            <FullScreenPopup active={isShow} setActive={setIsShow}>
                <LoginForm />
            </FullScreenPopup>
            <FullScreenPopup active={isShowRating} setActive={setIsShowRating}>
                <div className={styles.rate_wrapper}>

                    {[...Array(10)].map((star, index) => {
                        index += 1;
                        return (
                            <span
                                id='rate-numbers'
                                key={index}
                                className={index <= (hover || rating) && index < 5 ? "red-rate" : index <= (hover || rating) && index <= 6 ? "gray-rate" : index <= (hover || rating) && index >= 6 ? "green-rate" : "off"}
                                onClick={() => { { setRating(index) } }}
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(rating)}>
                                {index}
                            </span>
                        );
                    })}
                    <div className={styles.rate_buttons_wrapper}>

                        {rating != 0 ?
                            <>
                                <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={18}
                                    onClick={() => (games_store.addGameGrade(games_store.gamePage.id, rating), games_store.setGameRate(rating), setRateButtonCount(rateButtonCount + 1), setIsShowRating(false))}>
                                    Отправить
                                </FunctionalGameButton>
                            </> : null}
                        {games_store.rate || rating != 0 ? <>
                            <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={18}
                                onClick={() => (rateButtonCount > 0 || games_store.rate > 0 ? games_store.delGameGrade(games_store.gamePage.id) : null,
                                    setHover(0), setRating(0), setRateButtonCount(0), games_store.setGameRate(0))}>
                                Удалить
                            </FunctionalGameButton>
                        </> : null}
                    </div>
                </div>
            </FullScreenPopup >
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

                                <span>
                                    {formatDate(games_store.gamePage.release_date)}
                                </span>
                            </span>

                        </div>
                        <div className={styles.active_button_wrapper}>


                            <FunctionalGameButton type={'button'} bg_color={findStatusStart ? '#FFFAA3' : '#D6D6D6'} onClick={() => { !auth_store.isAuth ? setIsShow(true) : changeGameStatus('start') }} fontSize={18}>
                                <div className={styles.button_data_wrapper}>
                                    <div className={styles.rocket_logo}></div>
                                    <span>Начал</span>
                                </div>
                            </FunctionalGameButton>
                            <FunctionalGameButton type={'button'} bg_color={findStatusComplete ? '#97E88A' : '#D6D6D6'} fontSize={18} onClick={() => { !auth_store.isAuth ? setIsShow(true) : changeGameStatus('complete') }}>
                                <div className={styles.button_data_wrapper}>
                                    <div className={styles.finish_logo}></div>
                                    <span>Прошёл</span>
                                </div>
                            </FunctionalGameButton>
                            <FunctionalGameButton type={'button'} bg_color={findStatusFavorite ? '#FFC0BA' : '#D6D6D6'} fontSize={18} onClick={() => { !auth_store.isAuth ? setIsShow(true) : addGameToFavorite() }}>
                                <div className={styles.button_data_wrapper}>
                                    <div className={styles.heart_logo}></div>
                                    <span>Любимая</span>
                                </div>
                            </FunctionalGameButton>
                            <FunctionalGameButton type={'button'} bg_color={findStatusWish ? '#58B0CF' : '#D6D6D6'} fontSize={18} onClick={() => { !auth_store.isAuth ? setIsShow(true) : changeGameStatus('wish') }}>
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
                <div className={styles.comments_block}>
                    <span className={styles.block_header}>Рецензии</span>

                    <CommentField contentID={games_store.gamePage.id} parentCommentId={null} setShowComment={setShowComment} />

                    {games_store.comments == null ?
                        <span>Информаци пока нет </span> : null}

                    <CommentCard postId={games_store.gamePage.id} comments={games_store.comments} commentLikes={[]} />


                </div>

            </main >


            <main className="right_side_wrapper">
                <div className={styles.information_card_wrapper}>
                    <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={20} onClick={() => { !auth_store.isAuth ? setIsShow(true) : (setIsShowRating(true), games_store.rate != 0 ? (setHover(games_store.rate), setRating(games_store.rate)) : null) }}>
                        <div className={styles.button_data_wrapper}>
                            <div className={styles.star_icon}></div>
                            <span>Оценить игру</span>
                        </div>
                    </FunctionalGameButton>
                    <div className={styles.other_information_grid}>

                        <div className={styles.other_info_card}>
                            <h3>Жанр</h3>
                            <div className={styles.information_text}>
                                {games_store.gamePage.genres?.map((genre, index) =>
                                    <span key={genre.genre.id}>
                                        {genre.genre.name + ((games_store.gamePage.genres.length > 0 && index !== games_store.gamePage.genres.length - 1) ? ', ' : '')}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className={styles.other_info_card}>
                            <h3>Платформа</h3>
                            <div className={styles.information_text}>
                                {games_store.gamePage.platforms?.map((platform, index) =>
                                    <span key={platform.platform.id}>
                                        {platform.platform.platform_name + ((games_store.gamePage.platforms.length > 0 && index !== games_store.gamePage.platforms.length - 1) ? ', ' : '')}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.stats_info_card}>
                        <h3>Статистика</h3>
                        <div>
                            <span>Прошли</span> <span>{games_store.gamePage.completed_count != null ? games_store.gamePage.completed_count : 0}</span>
                        </div>
                        <div>
                            <span>Понравилась</span> <span>{games_store.gamePage.favorite_count != null ? games_store.gamePage.favorite_count : 0}</span>
                        </div>
                        <div>
                            <span>Отложили</span> <span>{games_store.gamePage.wishlist_count != null ? games_store.gamePage.wishlist_count : 0}</span>
                        </div>
                    </div>
                </div>

            </main>

        </>

    );
}

export default observer(GamePage)
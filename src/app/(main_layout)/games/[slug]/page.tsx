'use client'

import { usePathname } from 'next/navigation'
import styles from './page.module.css'
import { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '@/app/providers';
import { observer } from 'mobx-react-lite';
import { FunctionalGameButton } from '@/components/buttons/FunctionalGameButton';
import useOutside from '@/hooks/useOutside';
import LoginForm from '@/components/forms/login_form/LoginForm';
import { FullScreenPopup } from '@/components/popup/main_popup/FullScreenPopup';

import CircleLoader from '@/components/loader/circle';
import CommentField from '@/components/fields/comment/CommentField';
import CommentCard from '@/components/cards/comment/CommentCard';
import { formatDate } from '@/services/dateFormat';
import ServiceButtonLong from '@/components/buttons/servicelong/ServiceButtonLong';
import StarIcon from '@/components/icons/star';
import CreateListIcon from '@/components/icons/createList';
import AddGameToList from '@/components/cards/add_game_to_ist/AddGameToList';
import ReactToast from '@/components/toast/Toast';


function GamePage() {

    const { games_store } = useContext(Context);
    const { auth_store } = useContext(Context);
    const { content_store } = useContext(Context);

    const pathname = usePathname()
    const [isShow, setIsShow] = useState(false);
    const [isShowRating, setIsShowRating] = useState(false);
    const popupRef = useRef(null)

    const [rating, setRating] = useState<number>(content_store.rate);
    const [hover, setHover] = useState<number>(content_store.rate);
    const [showComment, setShowComment] = useState(false)

    const [rateButtonCount, setRateButtonCount] = useState<number>(0);
    const [active, setActive] = useState(false)
    const [toastText, setToastText] = useState<string>('')

    useOutside(popupRef, () => {
        if (isShow) {
            setTimeout(() => setIsShow(false), 50)
        }
        if (isShowRating) {
            setTimeout(() => setIsShowRating(false), 50)
        }

    })


    const findStatusStart = auth_store.user.user_activity?.find(product => product.game_data.id == content_store.gamePage.id && product.activity_data.code == 200000)
    const findStatusWish = auth_store.user.user_activity?.find(product => product.game_data.id == content_store.gamePage.id && product.activity_data.code == 210000)
    const findStatusComplete = auth_store.user.user_activity?.find(product => product.game_data.id == content_store.gamePage.id && product.activity_data.code == 220000)
    const findStatusFavorite = auth_store.user.user_favorite?.find(product => product.game_data.id == content_store.gamePage.id)



    useEffect(() => {
        content_store.getGamePage(pathname.substring(pathname.lastIndexOf('/') + 1))
        setRating(content_store.rate)
        setHover(content_store.rate)
        content_store.getUserPlaylistsMe()

    }, [games_store, auth_store])


    const changeGameStatus = (activityType: string) => {
        auth_store.changeGameStatus(content_store.gamePage.id, activityType)
    }
    const addGameToFavorite = () => {
        auth_store.addGameToFavorite(content_store.gamePage.id)
    }

    return (
        <>
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
                                <ServiceButtonLong type={'button'}
                                    onClick={() => (games_store.addGameGrade(content_store.gamePage.id, rating), content_store.setGameRate(rating), setRateButtonCount(rateButtonCount + 1), setIsShowRating(false))}>
                                    Отправить
                                </ServiceButtonLong>
                            </> : null}
                        {content_store.rate || rating != 0 ? <>
                            <ServiceButtonLong type={'button'}
                                onClick={() => (rateButtonCount > 0 || content_store.rate > 0 ? games_store.delGameGrade(content_store.gamePage.id) : null,
                                    setHover(0), setRating(0), setRateButtonCount(0), content_store.setGameRate(0))}>
                                Удалить
                            </ServiceButtonLong>
                        </> : null}
                    </div>
                </div>
            </FullScreenPopup >
            <FullScreenPopup active={isShow} setActive={setIsShow}>
                <AddGameToList setIsShow={setIsShow} setToastText={undefined} setActive={undefined}
                    gamePage={content_store.gamePage} />
            </FullScreenPopup>
            <main className="main_content_wrapper">
                <div className={styles.main_info_wrapper}>
                    <div className={styles.cover_wrapper}>
                        <img src={content_store.gamePage.cover} alt={content_store.gamePage.title} className={styles.game_cover} />
                    </div>
                    <div className={styles.right_side}>
                        <div className={styles.title_wrapper}>
                            <h1>
                                {content_store.gamePage.title}
                            </h1>
                            <span>

                                <span>
                                    {formatDate(content_store.gamePage.release_date)}
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
                        {content_store.gamePage.description !== null ? content_store.gamePage.description :
                            <>Информаци пока нет</>}
                    </span>
                </div>
                <div className={styles.comments_block}>
                    <span className={styles.block_header}>Рецензии</span>
                    <CommentField contentID={content_store.gamePage.id} parentCommentId={null} setShowComment={setShowComment} uniqueId={content_store.gamePage.id} />
                    {!content_store.comments.length ?
                        <span>Информаци пока нет </span> :
                        <CommentCard postId={content_store.gamePage.id} comments={content_store.comments} commentLikes={content_store.commentLikes} />
                    }
                </div>

            </main >


            <div className="right_side_wrapper">
                <div className={styles.information_card_wrapper}>
                    <ServiceButtonLong type={'button'} onClick={() => { !auth_store.isAuth ? (setToastText('Авторизуйтесь, чтобы выполнить данное действие'), setActive(true)) : (setIsShowRating(true), content_store.rate != 0 ? (setHover(content_store.rate), setRating(content_store.rate)) : null) }}>
                        <div className={styles.button_data_wrapper}>
                            <div className={styles.icon_wrapper}>
                                <StarIcon className='general-icon' />
                            </div>
                            <span>Оценить игру</span>
                        </div>
                    </ServiceButtonLong>
                    <ServiceButtonLong type={'button'} onClick={() => { !auth_store.isAuth ? (setToastText('Авторизуйтесь, чтобы выполнить данное действие'), setActive(true)) : setIsShow(true) }} >
                        <div className={styles.button_data_wrapper}>
                            <div className={styles.icon_wrapper}>
                                <CreateListIcon className='general-icon-fill' />
                            </div>
                            <span>Добавить игру в список</span>
                        </div>
                    </ServiceButtonLong>
                    <div className={styles.other_information_grid}>

                        <div className={styles.other_info_card}>
                            <h3>Жанр</h3>
                            <div className={styles.information_text}>
                                {content_store.gamePage.genres?.map((genre, index) =>
                                    <span key={genre.genre.id}>
                                        {genre.genre.name + ((content_store.gamePage?.genres?.length > 0 && index !== content_store.gamePage?.genres?.length - 1) ? ', ' : '')}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className={styles.other_info_card}>
                            <h3>Платформа</h3>
                            <div className={styles.information_text}>
                                {content_store.gamePage?.platforms?.map((platform, index) =>
                                    <span key={platform.platform.id}>
                                        {platform.platform.platform_name + ((content_store.gamePage?.platforms?.length > 0 && index !== content_store.gamePage?.platforms?.length - 1) ? ', ' : '')}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.stats_info_card}>
                        <h3>Статистика</h3>
                        <div>
                            <span>Начали</span> <span>{content_store.gamePage.start_count != null ? content_store.gamePage.start_count : 0}</span>
                        </div>
                        <div>
                            <span>Прошли</span> <span>{content_store.gamePage.completed_count != null ? content_store.gamePage.completed_count : 0}</span>
                        </div>
                        <div>
                            <span>Понравилась</span> <span>{content_store.gamePage.favorite_count != null ? content_store.gamePage.favorite_count : 0}</span>
                        </div>
                        <div>
                            <span>Отложили</span> <span>{content_store.gamePage.wishlist_count != null ? content_store.gamePage.wishlist_count : 0}</span>
                        </div>
                    </div>
                </div>

            </div>
            <ReactToast timeout={5000} active={active} setActive={setActive} toastText={toastText} setToastText={setToastText} />

        </>

    );
}

export default observer(GamePage)
'use client'

import { usePathname, useRouter, useSelectedLayoutSegment } from 'next/navigation'
import styles from './page.module.css'
import { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '@/app/providers';
import { observer } from 'mobx-react-lite';
import { FunctionalGameButton } from '@/components/buttons/FunctionalGameButton';
import SkeletonLoader from '@/components/loader/loader';
import useOutside from '@/hooks/useOutside';
import LoginForm from '@/components/forms/login_form/LoginForm';
import { FullScreenPopup } from '@/components/popup/FullScreenPopup';
import CommentField from '@/components/fields/comment/CommentField';

import Link from 'next/link';


function GamePage() {
    const pathname = usePathname()
    const [isShow, setIsShow] = useState(false);
    const popupRef = useRef(null)
    const [showChildComments, setShowChildComments] = useState<{ [key: string]: number }>({})
    const [showMoreComments, setShowMoreComments] = useState(3)
    const [replyWindowIsOpen, setreplyWindowIsOpen] = useState('')
    useOutside(popupRef, () => {
        if (isShow) {
            setTimeout(() => setIsShow(false), 50)
        }

    })
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

    const [commentText, setCommentText] = useState("");
    const [reply, setReply] = useState("");

    const changeGameStatus = (activityType: string) => {
        auth_store.changeGameStatus(games_store.gamePage.id, activityType)
    }
    const addGameToFavorite = () => {
        auth_store.addGameToFavorite(games_store.gamePage.id)
    }


    const showMoreChildComments = (parendID: string, showLenght: number) => {
        console.log(showLenght)
        if (!showChildComments.hasOwnProperty(parendID)) {
            const updatedValue: { [key: string]: number } = {};
            updatedValue[parendID] = showLenght
            setShowChildComments(commentsToShow => ({
                ...commentsToShow,
                ...updatedValue
            }))
        }
        else {
            const updatedValue: { [key: string]: number } = {};
            updatedValue[parendID] = showChildComments[parendID] + showLenght
            setShowChildComments(commentsToShow => ({
                ...commentsToShow,
                ...updatedValue
            }))
        }


    }
    const showCommentsMore = () => {
        setShowMoreComments(showMoreComments + 5)
    }
    const replyToComment = (itemId: string, parentCommentId: string) => {
        setReply('')
        setreplyWindowIsOpen('')
        games_store.addNewComment(itemId, reply, parentCommentId)
    }

    return (
        <>
            <FullScreenPopup active={isShow} setActive={setIsShow}>

                <LoginForm />
            </FullScreenPopup>
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


                            <FunctionalGameButton type={'button'} bg_color={findStatusStart ? '#FFFAA3' : '#D6D6D6'} onClick={() => { !auth_store.isAuth ? setIsShow(true) : changeGameStatus('start') }} fontSize={20}>
                                <div className={styles.button_data_wrapper}>
                                    <div className={styles.rocket_logo}></div>
                                    <span>Начал</span>
                                </div>
                            </FunctionalGameButton>
                            <FunctionalGameButton type={'button'} bg_color={findStatusComplete ? '#97E88A' : '#D6D6D6'} fontSize={20} onClick={() => { !auth_store.isAuth ? setIsShow(true) : changeGameStatus('complete') }}>
                                <div className={styles.button_data_wrapper}>
                                    <div className={styles.finish_logo}></div>
                                    <span>Прошёл</span>
                                </div>
                            </FunctionalGameButton>
                            <FunctionalGameButton type={'button'} bg_color={findStatusFavorite ? '#FFC0BA' : '#D6D6D6'} fontSize={20} onClick={() => { !auth_store.isAuth ? setIsShow(true) : addGameToFavorite() }}>
                                <div className={styles.button_data_wrapper}>
                                    <div className={styles.heart_logo}></div>
                                    <span>Любимая</span>
                                </div>
                            </FunctionalGameButton>
                            <FunctionalGameButton type={'button'} bg_color={findStatusWish ? '#58B0CF' : '#D6D6D6'} fontSize={20} onClick={() => { !auth_store.isAuth ? setIsShow(true) : changeGameStatus('wish') }}>
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

                    <div className={styles.comment_field_wrapper}>
                        <CommentField value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Ваш отзыв" />
                        {commentText !== "" ? <>
                            <div className={styles.send_button_wrapper}>
                                <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={12}
                                    onClick={() => (games_store.addNewComment(games_store.gamePage.id, commentText, null), setCommentText(''))}>
                                    Отправить
                                </FunctionalGameButton>
                            </div>
                        </> : null}

                    </div>

                    {games_store.comments == null ?
                        <span>Информаци пока нет </span> : null}

                    {games_store.comments.slice(0, showMoreComments).map(comment => (
                        <div key={comment.id} className={styles.parent_comment}>
                            <div className={styles.user_info_wrapper}>
                                <div className={styles.user_icon}></div>
                                <div className={styles.user_info_comment}>
                                    <Link href={'/' + comment.author_info.username} >{comment.author_info.full_name}</Link>
                                    <span>{comment.created_at}</span>
                                </div>
                            </div>
                            <span>{comment.text}</span>
                            <div className={styles.like_and_reply_comment}>
                                <span className={styles.reply_button} onClick={() => (setreplyWindowIsOpen(comment.id), setReply(''))}>
                                    Ответить</span>

                            </div>
                            {replyWindowIsOpen == comment.id ?
                                <div className={styles.comment_field_wrapper}>
                                    <CommentField value={reply}
                                        onChange={(e) => setReply(e.target.value)}
                                        placeholder="Ваш отзыв" />

                                    <div className={styles.send_button_wrapper} id={comment.id}>
                                        <div className={styles.func_button_wrapper}>
                                            {reply !== "" ? <>
                                                <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={12}
                                                    onClick={() => replyToComment(games_store.gamePage.id, comment.id)}>
                                                    Отправить
                                                </FunctionalGameButton>
                                                <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={12}
                                                    onClick={() => (setreplyWindowIsOpen(''), setReply(''))}>
                                                    Отмена
                                                </FunctionalGameButton>
                                            </> : <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={12}
                                                onClick={() => (setreplyWindowIsOpen(''), setReply(''))}>
                                                Отмена
                                            </FunctionalGameButton>}
                                        </div>
                                    </div>

                                </div> : null}
                            {showChildComments[comment.id] ?
                                <>
                                    {comment.child_comment.slice(0, showChildComments[comment.id]).map(child => (
                                        <div key={child.id} className={styles.child_comment}>
                                            <div className={styles.user_info_wrapper}>
                                                <div className={styles.user_icon}></div>
                                                <div className={styles.user_info_comment}>
                                                    <Link href={'/' + child.author_info.username} >
                                                        {child.author_info.full_name}</Link>
                                                    <span>{child.created_at}</span>
                                                </div>
                                            </div>
                                            <span>{child.text}</span>
                                            <div className={styles.like_and_reply_comment}>
                                                <span className={styles.reply_button}
                                                    onClick={() => (setreplyWindowIsOpen(child.id), setReply(''))}>
                                                    Ответить</span>
                                            </div>
                                            {replyWindowIsOpen == child.id ?
                                                <div className={styles.comment_field_wrapper}>
                                                    <CommentField value={reply}
                                                        onChange={(e) => setReply(e.target.value)}
                                                        placeholder="Ваш отзыв" />

                                                    <div className={styles.send_button_wrapper} id={child.id}>
                                                        <div className={styles.func_button_wrapper}>
                                                            {reply !== "" ? <>
                                                                <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={12}
                                                                    onClick={() => replyToComment(games_store.gamePage.id, comment.id)}>
                                                                    Отправить
                                                                </FunctionalGameButton>
                                                                <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={12}
                                                                    onClick={() => (setreplyWindowIsOpen(''), setReply(''))}>
                                                                    Отмена
                                                                </FunctionalGameButton>
                                                            </> : <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={12}
                                                                onClick={() => (setreplyWindowIsOpen(''), setReply(''))}>
                                                                Отмена
                                                            </FunctionalGameButton>}
                                                        </div>
                                                    </div>

                                                </div> : null}
                                        </div>
                                    ))}
                                </>
                                : <>
                                    {comment.child_comment.slice(0, 0).map(child => (
                                        <div key={child.id} className={styles.child_comment}>
                                            <div className={styles.user_info_wrapper}>
                                                <div className={styles.user_icon}></div>
                                                <div className={styles.user_info_comment}>
                                                    <Link href={'/' + child.author_info.username} >
                                                        {child.author_info.full_name}</Link>
                                                    <span>{child.created_at}</span>
                                                </div>
                                            </div>
                                            <span>{child.text}</span>
                                            <div className={styles.like_and_reply_comment}>
                                                <span className={styles.reply_button}
                                                    onClick={() => (setreplyWindowIsOpen(child.id), setReply(''))}>
                                                    Ответить</span>
                                            </div>
                                            {replyWindowIsOpen == child.id ?
                                                <div className={styles.comment_field_wrapper}>
                                                    <CommentField value={reply}
                                                        onChange={(e) => setReply(e.target.value)}
                                                        placeholder="Ваш отзыв" />

                                                    <div className={styles.send_button_wrapper} id={child.id}>
                                                        <div className={styles.func_button_wrapper}>
                                                            {reply !== "" ? <>
                                                                <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={12}
                                                                    onClick={() => replyToComment(games_store.gamePage.id, comment.id)}>
                                                                    Отправить
                                                                </FunctionalGameButton>
                                                                <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={12}
                                                                    onClick={() => (setreplyWindowIsOpen(''), setReply(''))}>
                                                                    Отмена
                                                                </FunctionalGameButton>
                                                            </> : <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={12}
                                                                onClick={() => (setreplyWindowIsOpen(''), setReply(''))}>
                                                                Отмена
                                                            </FunctionalGameButton>}
                                                        </div>
                                                    </div>

                                                </div> : null}
                                        </div>
                                    ))}
                                </>}
                            {comment.child_comment.length > 0 && !showChildComments.hasOwnProperty(comment.id) || showChildComments[comment.id] < comment.child_comment.length ?

                                <span onClick={() => showMoreChildComments(comment.id, comment.child_comment.length)}
                                    className={styles.show_more_button}>Показать ответы</span>

                                : null}
                        </div>
                    ))}
                    {games_store.comments.length > 0 && showMoreComments < games_store.comments.length ?
                        <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={20}
                            onClick={() => showCommentsMore()} >
                            <span >Показать ещё</span>
                        </FunctionalGameButton>

                        : null}
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
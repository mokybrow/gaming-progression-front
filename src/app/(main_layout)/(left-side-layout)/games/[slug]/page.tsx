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
import { FormattedDate } from 'react-intl';
import { SearchUserModel } from '@/models/userModel';


function GamePage() {
    const pathname = usePathname()
    const [isShow, setIsShow] = useState(false);
    const [isShowRating, setIsShowRating] = useState(false);
    const popupRef = useRef(null)
    const [showChildComments, setShowChildComments] = useState<{ [key: string]: number }>({})
    const [showMoreComments, setShowMoreComments] = useState(3)
    const [replyWindowIsOpen, setreplyWindowIsOpen] = useState('')
    const [likeComment, setLikeComment] = useState(false)
    const [rating, setRating] = useState<number>(0);
    const [hover, setHover] = useState<number>(0);

    const [rateButtonCount, setRateButtonCount] = useState<number>(0);

    const { games_store } = useContext(Context);
    const { auth_store } = useContext(Context);
    const { content_store } = useContext(Context);

    const [commentText, setCommentText] = useState<string>('');
    const [reply, setReply] = useState("");

    const [customers, setCustomers] = useState<any>([]);
    const [suggestions, setSuggestions] = useState<SearchUserModel[]>([]);

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

    const showMoreChildComments = (parendID: string, showLenght: number) => {
        if (!showChildComments.hasOwnProperty(parendID)) {
            const updatedValue: { [key: string]: number } = {};
            updatedValue[parendID] = 5
            setShowChildComments(commentsToShow => ({
                ...commentsToShow,
                ...updatedValue
            }))
        }
        else {
            const updatedValue: { [key: string]: number } = {};
            updatedValue[parendID] = showChildComments[parendID] + 5
            setShowChildComments(commentsToShow => ({
                ...commentsToShow,
                ...updatedValue
            }))
        }
    }

    const changeCommentsLikeValue = (commentId: string) => {
        games_store.likeComment(commentId, '985449ce-ebe9-4214-a161-a6a51e9059bc', true)
    }

    const showCommentsMore = () => {
        setShowMoreComments(showMoreComments + 5)
    }


    const saveNewComment = (itemId: string, parentCommentId?: string | null) => {
        let newComment = commentText;
        if (newComment != '') {
            let comment = newComment.replace(/\s+/g, ' ').trim();
            const result = comment.replace(/(^|\W)@(\w+)/g, function (_, $1, $2) { return `[@${$2}](/${$2})` })
            games_store.addNewComment(itemId, result, parentCommentId)

        }
    }
    const saveNewChildComment = (itemId: string, parentCommentId?: string | null) => {
        let newComment = reply;
        if (newComment != '') {
            let comment = newComment.replace(/\s+/g, ' ').trim();
            const result = comment.replace(/(^|\W)@(\w+)/g, function (_, $1, $2) { return `[@${$2}](/${$2})` })
            games_store.addNewComment(itemId, result, parentCommentId)

        }
    }

    const onSearch = (event: { query: any; }) => {
        //in a real application, make a request to a remote url with the query and return suggestions, for demo we filter at client side
        setTimeout(() => {
            let suggestions;
            if (event.query != '') {

                content_store.searchUser(event.query)
            }
            else {
                content_store.setSearchUsers([])
            }

            if (!content_store.users.length) {
                suggestions = [...customers];
            }
            else {
                suggestions = content_store.users.filter(customer => {
                    return customer.username;
                })

            }

            setSuggestions(suggestions);
        }, 1000);
    }

    const handleChangeForMainComment = (event: any) => {
        setCommentText(event.value)
    }
    const handleChangeForReplyComment = (event: any) => {
        setReply(event.value)
    }


    const itemTemplate = (suggestion: SearchUserModel) => {

        return (
            <div>
                <span className={styles.item_temlate_span}>
                    {suggestion.username}
                    <small style={{ fontSize: '.75rem' }}>@{suggestion.username}</small>
                </span>
            </div>
        );
    }

    return (
        <>
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

                                <FormattedDate
                                    value={games_store.gamePage.release_date}
                                    year='numeric'
                                    month='long'
                                    day='numeric' />
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

                    <div className={styles.comment_field_wrapper}>
                        <Mention onChange={(e) => handleChangeForMainComment(e.target)}
                            value={commentText} suggestions={suggestions} onSearch={onSearch} field="username"
                            placeholder="Ваш отзыв. Введите @ чтобы отметить человека" itemTemplate={itemTemplate}
                            style={{ width: '100%' }} className={styles.mention} autoResize />


                        {commentText !== "" && commentText.replace(/\s+/g, ' ').trim() !== "" ? <>
                            <div className={styles.send_button_wrapper}>
                                <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={12}
                                    onClick={() => { !auth_store.isAuth ? setIsShow(true) : (saveNewComment(games_store.gamePage.id, null), setCommentText('')) }}>
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
                                    <div className={styles.user_info_block}>

                                        {comment.author_info.full_name === null ?
                                            <Link href={'/' + comment.author_info.username} className={styles.username_link}>
                                                @{comment.author_info.username}</Link> :
                                            <>
                                                <Link href={'/' + comment.author_info.username} >
                                                    {comment.author_info.full_name != null ? comment.author_info.full_name : comment.author_info.username}</Link>
                                                <Link href={'/' + comment.author_info.username} className={styles.username_link}>
                                                    @{comment.author_info.username}</Link>
                                            </>
                                        }
                                    </div>

                                    <span>
                                        <FormattedDate
                                            value={comment.created_at}
                                            year='numeric'
                                            month='long'
                                            day='numeric' />
                                    </span>
                                </div>
                            </div>

                            <span className={styles.markdown_text}><ReactMarkdown>{comment.text}</ReactMarkdown></span>

                            <div className={styles.like_and_reply_comment}>
                                <div className={styles.like_block}>
                                    <div className="like-button" onClick={() => { !auth_store.isAuth ? setIsShow(true) : (changeCommentsLikeValue(comment.id), games_store.commentsLikes.find(o => o.id === comment.id && o.hasAuthorLike === 1) ? games_store.setCommentsLikeDecrease(comment.id) : games_store.setCommentsLikeIncrease(comment.id)) }}>

                                        <LikeIcon className={games_store.commentsLikes.find(o => o.id === comment.id && o.hasAuthorLike === 1) ? "heart-icon liked" : "heart-icon"} />

                                    </div>
                                    <span >{comment.like_count}</span>
                                </div>
                                <span className={styles.reply_button} onClick={() => { !auth_store.isAuth ? setIsShow(true) : (setreplyWindowIsOpen(comment.id), setReply('')) }}>
                                    Ответить
                                </span>

                            </div>
                            {replyWindowIsOpen == comment.id ?
                                <div className={styles.comment_field_wrapper}>
                                    <Mention onChange={(e) => handleChangeForReplyComment(e.target)}
                                        value={reply} suggestions={suggestions} onSearch={onSearch} field="username"
                                        placeholder="Ваш отзыв. Введите @ чтобы отметить человека" itemTemplate={itemTemplate}
                                        style={{ width: '100%' }} className={styles.mention} autoResize />
                                    <div className={styles.send_button_wrapper} id={comment.id}>

                                        {reply !== "" && reply.replace(/\s+/g, ' ').trim() !== "" ?
                                            <div className={styles.func_button_wrapper}>
                                                <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={12}
                                                    onClick={() => (saveNewChildComment(games_store.gamePage.id, comment.id), setReply(''))}>
                                                    Отправить
                                                </FunctionalGameButton>
                                                <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={12}
                                                    onClick={() => (setreplyWindowIsOpen(''), setReply(''))}>
                                                    Отмена
                                                </FunctionalGameButton>
                                            </div>
                                            :
                                            <div className={styles.func_button_wrapper}>
                                                <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={12}
                                                    onClick={() => (setreplyWindowIsOpen(''), setReply(''))}>
                                                    Отмена
                                                </FunctionalGameButton>
                                            </div>
                                        }
                                    </div>

                                </div> : null}
                            {showChildComments[comment.id] ?
                                <>
                                    {comment.child_comment.slice(0, showChildComments[comment.id]).map(child => (
                                        <div key={child.id} className={styles.child_comment}>
                                            <div className={styles.user_info_wrapper}>
                                                <div className={styles.user_icon}></div>
                                                <div className={styles.user_info_comment}>
                                                    <div className={styles.user_info_block}>
                                                        {child.author_info.full_name === null ?
                                                            <Link href={'/' + child.author_info.username} className={styles.username_link}>
                                                                @{child.author_info.username}</Link> :
                                                            <>
                                                                <Link href={'/' + child.author_info.username} >
                                                                    {child.author_info.full_name != null ? child.author_info.full_name : child.author_info.username}</Link>
                                                                <Link href={'/' + child.author_info.username} className={styles.username_link}>
                                                                    @{child.author_info.username}</Link>
                                                            </>
                                                        }
                                                    </div>
                                                    <span>
                                                        <FormattedDate
                                                            value={child.created_at}
                                                            year='numeric'
                                                            month='long'
                                                            day='numeric' />
                                                    </span>
                                                </div>
                                            </div>
                                            <span className={styles.markdown_text}><ReactMarkdown>{child.text}</ReactMarkdown></span>

                                            <div className={styles.like_and_reply_comment}>
                                                <div className={styles.like_block}>

                                                    <div className="like-button" onClick={() => { !auth_store.isAuth ? setIsShow(true) : (changeCommentsLikeValue(child.id), games_store.commentsLikes.find(o => o.id === child.id && o.hasAuthorLike === 1) ? games_store.setChildCommentsLikeDecrease(child.id) : games_store.setChildCommentsLikeIncrease(child.id)) }}>
                                                        <LikeIcon className={games_store.commentsLikes.find(o => o.id === child.id && o.hasAuthorLike === 1) ? "heart-icon liked" : "heart-icon"} />
                                                    </div>

                                                    <span >{child.like_count}</span>
                                                </div>
                                                <span className={styles.reply_button} onClick={() => { !auth_store.isAuth ? setIsShow(true) : (setreplyWindowIsOpen(child.id), setReply('')) }}>
                                                    Ответить
                                                </span>
                                            </div>
                                            {replyWindowIsOpen == child.id ?
                                                <div className={styles.comment_field_wrapper}>
                                                    <Mention onChange={(e) => handleChangeForReplyComment(e.target)}
                                                        value={reply} suggestions={suggestions} onSearch={onSearch} field="username"
                                                        placeholder="Ваш отзыв. Введите @ чтобы отметить человека" itemTemplate={itemTemplate}
                                                        style={{ width: '100%' }} className={styles.mention} autoResize />
                                                    <div className={styles.send_button_wrapper} id={comment.id}>

                                                        {reply !== "" && reply.replace(/\s+/g, ' ').trim() !== "" ?
                                                            <div className={styles.func_button_wrapper}>
                                                                <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={12}
                                                                    onClick={() => (saveNewChildComment(games_store.gamePage.id, comment.id), setReply(''))}>
                                                                    Отправить
                                                                </FunctionalGameButton>
                                                                <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={12}
                                                                    onClick={() => (setreplyWindowIsOpen(''), setReply(''))}>
                                                                    Отмена
                                                                </FunctionalGameButton>
                                                            </div>
                                                            :
                                                            <div className={styles.func_button_wrapper}>
                                                                <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={12}
                                                                    onClick={() => (setreplyWindowIsOpen(''), setReply(''))}>
                                                                    Отмена
                                                                </FunctionalGameButton>
                                                            </div>
                                                        }
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
                                                <div className="like-button">
                                                    <div className="heart-bg">
                                                        <div className={likeComment ? "heart-icon liked" : "heart-icon"} onClick={() => setLikeComment(!likeComment)}></div>
                                                    </div>
                                                </div>
                                                <span >{comment.like_count}</span>
                                                <span className={styles.reply_button}
                                                    onClick={() => (setreplyWindowIsOpen(child.id), setReply(`[@${child.author_info.username}](http://localhost:3000/${child.author_info.username})`))}>
                                                    Ответить</span>
                                            </div>
                                            {replyWindowIsOpen == child.id ?
                                                <div className={styles.comment_field_wrapper}>
                                                    <Mention onChange={(e) => handleChangeForReplyComment(e.target)}
                                                        value={reply} suggestions={suggestions} onSearch={onSearch} field="username"
                                                        placeholder="Ваш отзыв. Введите @ чтобы отметить человека" itemTemplate={itemTemplate}
                                                        style={{ width: '100%' }} className={styles.mention} autoResize />

                                                    <div className={styles.send_button_wrapper} id={child.id}>
                                                        <div className={styles.func_button_wrapper}>
                                                            {reply !== "" && reply.replace(/\s+/g, ' ').trim() !== "" ? <>
                                                                <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={12}
                                                                    onClick={() => (saveNewChildComment(games_store.gamePage.id, comment.id), setReply(''))}>
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
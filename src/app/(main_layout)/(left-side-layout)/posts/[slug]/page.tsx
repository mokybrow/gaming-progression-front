'use client'

import { Context } from "@/app/providers";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import styles from './page.module.css'
import { FormattedDate } from 'react-intl';
import { observer } from "mobx-react-lite";
import { Mention } from 'primereact/mention';
import { SearchUserModel } from "@/models/userModel";
import { FunctionalGameButton } from "@/components/buttons/FunctionalGameButton";
import Image from 'next/image'
import userpic from '@/assets/icons/general/userpic.svg'
import { motion } from "framer-motion";
import ActivityCard from "@/components/cards/activity_card/ActivityCard";
import FavoriteCard from "@/components/cards/favorite_card/FavoriteCard";
import PostCard from "@/components/cards/post_card/PostCard";
import { v4 as uuidv4 } from 'uuid';
import { SubmitButton } from "@/components/buttons/SubmitButton";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import LikeIcon from "@/components/icons/like";
import { FullScreenPopup } from "@/components/popup/FullScreenPopup";
import LoginForm from "@/components/forms/login_form/LoginForm";


function PostPage() {

    const pathname = usePathname()

    const { auth_store } = useContext(Context);
    const { content_store } = useContext(Context);
    const id = pathname.substring(pathname.lastIndexOf('/') + 1)

    const [postText, setPostText] = useState<string>('');
    const [suggestions, setSuggestions] = useState<SearchUserModel[]>([]);
    const [customers, setCustomers] = useState<any>([]);
    const [commentText, setCommentText] = useState<string>('');
    const [reply, setReply] = useState("");
    const [showMoreComments, setShowMoreComments] = useState(3)
    const [isShow, setIsShow] = useState(false);
    const [replyWindowIsOpen, setreplyWindowIsOpen] = useState('')
    const [showChildComments, setShowChildComments] = useState<{ [key: string]: number }>({})
    const [likeComment, setLikeComment] = useState(false)

    useEffect(() => {
        
        content_store.getPostData(id)


    }, [auth_store])


    const onSearch = (event: { query: any; }) => {
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

    const changeCommentsLikeValue = (commentId: string) => {
        content_store.likeContent(commentId, '985449ce-ebe9-4214-a161-a6a51e9059bc', true)
    }

    const showCommentsMore = () => {
        setShowMoreComments(showMoreComments + 5)
    }
    const saveNewComment = (itemId: string, parentCommentId?: string | null) => {
        let newComment = commentText;
        if (newComment != '') {
            let comment = newComment.replace(/\s+/g, ' ').trim();
            const result = comment.replace(/(^|\W)@(\w+)/g, function (_, $1, $2) { return `[@${$2}](/${$2})` })
            content_store.addNewComment(itemId, result, parentCommentId)

        }
    }
    const saveNewChildComment = (itemId: string, parentCommentId?: string | null) => {
        let newComment = reply;
        if (newComment != '') {
            let comment = newComment.replace(/\s+/g, ' ').trim();
            const result = comment.replace(/(^|\W)@(\w+)/g, function (_, $1, $2) { return `[@${$2}](/${$2})` })
            content_store.addNewComment(itemId, result, parentCommentId)

        }
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
            <main className="content_wrapper">


                <div key={content_store.post.Posts?.id}>
                    <PostCard text={content_store.post.Posts?.text} like_count={content_store.post.Posts?.like_count}
                        created_at={content_store.post.Posts?.created_at} postId={content_store.post.Posts?.id}
                        comment_count={content_store.post.commentCount} full_name={content_store.post.Posts?.users.full_name}
                        username={content_store.post.Posts?.users.username} parentPostData={content_store.post.Posts?.parent_post_data} />
                </div>
                <div className={styles.comments_block}>
                    <span className={styles.block_header}>Комментарии</span>

                    <div className={styles.comment_field_wrapper}>
                        <Mention onChange={(e) => handleChangeForMainComment(e.target)}
                            value={commentText} suggestions={suggestions} onSearch={onSearch} field="username"
                            placeholder="Ваш комментарий. Введите @ чтобы отметить человека" itemTemplate={itemTemplate}
                            style={{ width: '100%' }} className={styles.mention} autoResize />


                        {commentText !== "" && commentText.replace(/\s+/g, ' ').trim() !== "" ? <>
                            <div className={styles.send_button_wrapper}>
                                <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={12}
                                    onClick={() => { !auth_store.isAuth ? setIsShow(true) : (saveNewComment(content_store.post.Posts.id, null), setCommentText('')) }}>
                                    Отправить
                                </FunctionalGameButton>
                            </div>
                        </> : null}

                    </div>

                    {content_store.comments == null ?
                        <span>Информаци пока нет </span> : null}

                    {content_store.comments.slice(0, showMoreComments).map(comment => (
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
                                    <div className="like-button" onClick={() => { !auth_store.isAuth ? setIsShow(true) : (changeCommentsLikeValue(comment.id), content_store.commentsLikes.find(o => o.id === comment.id && o.hasAuthorLike === 1) ? content_store.setCommentsLikeDecrease(comment.id) : content_store.setCommentsLikeIncrease(comment.id)) }}>

                                        <LikeIcon className={content_store.commentsLikes.find(o => o.id === comment.id && o.hasAuthorLike === 1) ? "heart-icon liked" : "heart-icon"} />

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
                                                    onClick={() => (saveNewChildComment(content_store.post.Posts.id, comment.id), setReply(''), setreplyWindowIsOpen(''))}>
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

                                                    <div className="like-button" onClick={() => { !auth_store.isAuth ? setIsShow(true) : (changeCommentsLikeValue(child.id), content_store.commentsLikes.find(o => o.id === child.id && o.hasAuthorLike === 1) ? content_store.setChildCommentsLikeDecrease(child.id) : content_store.setChildCommentsLikeIncrease(child.id)) }}>
                                                        <LikeIcon className={content_store.commentsLikes.find(o => o.id === child.id && o.hasAuthorLike === 1) ? "heart-icon liked" : "heart-icon"} />
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
                                                                    onClick={() => (saveNewChildComment(content_store.post.Posts.id, comment.id), setReply(''), setreplyWindowIsOpen(''))}>
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
                                                                    onClick={() => (saveNewChildComment(content_store.post.Posts.id, comment.id), setReply(''))}>
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
                    {content_store.comments.length > 0 && showMoreComments < content_store.comments.length ?
                        <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={20}
                            onClick={() => showCommentsMore()} >
                            <span >Показать ещё</span>
                        </FunctionalGameButton>

                        : null}
                </div>

            </main >
            <main className="right_side_wrapper">
                Раздел на ремонте
            </main>

        </>
    );
}

export default observer(PostPage);
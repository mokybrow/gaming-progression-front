'use client'

import { Genre, Platform } from '@/models/gamesModel';
import styles from './card.module.css'
import Link from 'next/link';
import { FormattedMessage, FormattedDate } from 'react-intl';
import Image from 'next/image'
import LikeIcon from '@/components/icons/like';
import { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '@/app/providers';
import { FullScreenPopup } from '@/components/popup/FullScreenPopup';
import LoginForm from '@/components/forms/login_form/LoginForm';
import CommentIcon from '@/components/icons/comment';
import { ParentPostData } from '@/models/postsModel';
import RepostIcon from '@/components/icons/repost';
import { MakeRepostPopup } from '@/components/popup/MakeRepostPopup';
import { Mention } from 'primereact/mention';
import { SearchUserModel } from '@/models/userModel';
import { FunctionalGameButton } from '@/components/buttons/FunctionalGameButton';
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';


export interface CardProps {
    postId: string,
    text: string,
    like_count: number,
    comment_count: number,
    created_at: string,
    full_name: string,
    username: string,
    parentPostData?: ParentPostData,

}

function PostCard({ text, like_count, created_at, postId, comment_count, full_name, username, parentPostData }: CardProps) {
    const { content_store } = useContext(Context);
    const { auth_store } = useContext(Context);
    const [isShow, setIsShow] = useState(false);
    const [isShowRepost, setIsShowRepost] = useState(false);
    const [postText, setPostText] = useState<string>('');
    const [suggestions, setSuggestions] = useState<SearchUserModel[]>([]);
    const [customers, setCustomers] = useState<any>([]);

    const [likeComment, setLikeComment] = useState(false)

    const changePostLikeValue = (postId: string) => {
        content_store.likeContent(postId, '9cc629c8-898a-4d16-b65e-25d0d37f9633', true)
    }
    const handleChangeForMainComment = (event: any) => {
        setPostText(event.value)
    }
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
    const createNewPost = () => {
        let newComment = postText;
        if (newComment != '') {
            let comment = newComment.replace(/\s+/g, ' ').trim();
            const result = comment.replace(/(^|\W)@(\w+)/g, function (_, $1, $2) { return `[@${$2}](/${$2})` })

            auth_store.createNewPost(uuidv4(), postId, result, username)
            setPostText('')

        }
    }
    return (
        <>
            <FullScreenPopup active={isShow} setActive={setIsShow}>
                <LoginForm />
            </FullScreenPopup>
            <MakeRepostPopup active={isShowRepost} setActive={setIsShowRepost}>

                <div className={styles.card_wrapper}>


                    <div className={styles.author_info_wrapper}>
                        <div className={styles.user_icon}></div>
                        <div className={styles.user_name}>
                            {full_name !== null ? <>
                                <span>{full_name}</span>
                            </> : <span>{username}</span>}
                            <small>
                                <FormattedDate
                                    value={created_at}
                                    year='numeric'
                                    month='short'
                                    day='numeric' />
                            </small>
                        </div>
                    </div>
                    <div className={styles.title_wrapper}>

                        <p>

                            <span className={styles.markdown_text}><ReactMarkdown>{text}</ReactMarkdown></span>

                        </p>
                    </div>
                    <div className={styles.under_post_buttons}>
                        <div className={styles.item_wrapper}>
                            <span>{like_count}</span>

                            <div className="like-button" onClick={() => {
                                !auth_store.isAuth ? setIsShow(true) :
                                    (changePostLikeValue(postId), auth_store.userPosts?.find(o => o.Posts?.id === postId && o.hasAuthorLike === 1) || (content_store.post.Posts?.id == postId && content_store.post.hasAuthorLike == 1) ?
                                        (auth_store.setPostsLikeDecrease(postId), content_store.setPostsLikeDecrease(postId)) : (auth_store.setPostsLikeIncrease(postId), content_store.setPostsLikeIncrease(postId)))
                            }}>

                                <LikeIcon className={auth_store.userPosts?.find(o => o.Posts?.id === postId && o.hasAuthorLike === 1) || (content_store.post.Posts?.id == postId && content_store.post.hasAuthorLike == 1) ? "heart-icon liked" : "heart-icon"} />
                            </div>
                        </div>
                        <div className={styles.item_wrapper}>
                            <span>{comment_count}</span>
                            <Link href={`/posts/${postId}`}>
                                <div className="like-button">
                                    <CommentIcon className='general-icon' />
                                </div>
                            </Link>
                        </div>
                        <div className={styles.item_wrapper} onClick={() => { !auth_store.isAuth ? setIsShow(true) : setIsShowRepost(true) }}>
                            <div className="like-button">
                                <RepostIcon className='general-icon' />
                            </div>
                        </div>
                    </div>
                    <div className={styles.post_text_filed}>

                        <Mention onChange={(e) => handleChangeForMainComment(e.target)}
                            value={postText} suggestions={suggestions} onSearch={onSearch} field="username"
                            placeholder="Ваше сообщение" itemTemplate={itemTemplate}
                            className={styles.mention} rows={1} autoResize />


                        {postText !== "" && postText.replace(/\s+/g, ' ').trim() !== "" ? <>
                            <div className={styles.send_button_wrapper}>
                                <FunctionalGameButton type={'button'} bg_color={'#0368CD'} fontSize={12} color={'#E8E8ED'}
                                    onClick={() => (createNewPost(), setIsShowRepost(false))}>
                                    Опубликовать
                                </FunctionalGameButton>
                            </div>
                        </> : null}
                    </div>
                </div>
            </MakeRepostPopup>
            <div className={styles.card_wrapper}>
                <div className={styles.author_info_wrapper}>
                    <div className={styles.user_icon}></div>
                    <div className={styles.user_name}>
                        {full_name !== null ? <>
                            <span>{full_name}</span>
                        </> : <span>{username}</span>}
                        <small>
                            <FormattedDate
                                value={created_at}
                                year='numeric'
                                month='short'
                                day='numeric' />
                        </small>
                    </div>
                </div>
                <div className={styles.title_wrapper}>

                    <p>
                        <span className={styles.markdown_text}><ReactMarkdown>{text}</ReactMarkdown></span>
                    </p>
                    {parentPostData != null ?
                        <>
                            <Link href={`/posts/${parentPostData.id}`}>
                                <div className={styles.repost_wrapper}>
                                    <div className={styles.author_info_wrapper}>
                                        <div className={styles.user_icon}></div>
                                        <div className={styles.user_name}>
                                            {parentPostData?.users.full_name !== null ? <>
                                                <span>{parentPostData?.users.full_name}</span>
                                            </> : <span>{parentPostData?.users.username}</span>}
                                            <small>
                                                <FormattedDate
                                                    value={parentPostData?.created_at}
                                                    year='numeric'
                                                    month='short'
                                                    day='numeric' />
                                            </small>
                                        </div>
                                    </div>

                                    <div className={styles.title_wrapper}>

                                        <p>

                                            <span className={styles.markdown_text}><ReactMarkdown>{parentPostData?.text.toString()}</ReactMarkdown></span>

                                        </p>

                                    </div>
                                </div>
                            </Link>

                        </>
                        : null}

                </div>

                <div className={styles.under_post_buttons}>
                    <div className={styles.item_wrapper}>
                        <span>{like_count}</span>

                        <div className="like-button" onClick={() => {
                            !auth_store.isAuth ? setIsShow(true) :
                                (changePostLikeValue(postId), auth_store.userPosts?.find(o => o.Posts?.id === postId && o.hasAuthorLike === 1) || (content_store.post.Posts?.id == postId && content_store.post.hasAuthorLike == 1) ?
                                    (auth_store.setPostsLikeDecrease(postId), content_store.setPostsLikeDecrease(postId)) : (auth_store.setPostsLikeIncrease(postId), content_store.setPostsLikeIncrease(postId)))
                        }}>

                            <LikeIcon className={auth_store.userPosts?.find(o => o.Posts?.id === postId && o.hasAuthorLike === 1) || (content_store.post.Posts?.id == postId && content_store.post.hasAuthorLike == 1) ? "heart-icon liked" : "heart-icon"} />
                        </div>
                    </div>
                    <div className={styles.item_wrapper}>
                        <span>{comment_count}</span>
                        <Link href={`/posts/${postId}`}>
                            <div className="like-button">
                                <CommentIcon className='general-icon' />
                            </div>
                        </Link>
                    </div>
                    <div className={styles.item_wrapper} onClick={() => { !auth_store.isAuth ? setIsShow(true) : setIsShowRepost(true) }}>
                        <div className="like-button">
                            <RepostIcon className='general-icon' />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )

}

export default observer(PostCard)
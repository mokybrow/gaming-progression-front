'use client'

import { Context } from "@/app/providers";
import { SearchUserModel } from "@/models/userModel";
import { useContext, useEffect, useRef, useState } from "react";
import styles from './repost.module.css'
import { observer } from "mobx-react-lite";
import { v4 as uuidv4 } from 'uuid';
import { usePathname } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import useOutside from "@/hooks/useOutside";
import { MentionPopup } from "@/components/popup/mention/MentionPopUp";
import { MentionButton } from "@/components/buttons/mention/MentionButton";
import ServiceButtonLong from "@/components/buttons/servicelong/ServiceButtonLong";

export interface PostFieldProps {
    parentPostId: string | null
    setIsShowRepost: any
}


function RepostField({ parentPostId, setIsShowRepost }: PostFieldProps) {

    const { content_store } = useContext(Context);
    const { auth_store } = useContext(Context);
    const { games_store } = useContext(Context);
    const [isShow, setIsShow] = useState(false);
    const [isShowUsers, setIsShowUsers] = useState(false);

    const [postText, setPostText] = useState<string>('');

    const [searchQuery, setSearchQuery] = useState('');
    const [searchQueryUser, setSearchQueryUser] = useState('');
    const [startSearch, setStartSearch] = useState(false);
    const [startSearchUser, setStartSearchUser] = useState(false);

    const [startValue, setStartValue] = useState(0);
    const [startValueUsers, setStartValueUsers] = useState(0);
    const [endValue, setEndValue] = useState(0);
    const [endValueUsers, setEndValueUsers] = useState(0);


    const debouncedSearch = useDebounce(searchQuery, 500);
    const debouncedSearchUser = useDebounce(searchQueryUser, 500);


    useEffect(() => {
        //search the api
        async function fetchData() {
            games_store.searchGames(String(debouncedSearch), 10)
        }
        if (debouncedSearch) {
            fetchData()
        }
        else {
            games_store.setSearchedGames([])
        }

    }, [debouncedSearch, games_store])


    useEffect(() => {
        //search the api
        async function fetchData() {
            content_store.searchUser(String(debouncedSearchUser))
        }
        if (debouncedSearchUser) {
            fetchData()
        }
        else {
            games_store.setSearchedGames([])
        }

    }, [debouncedSearchUser, content_store])


    const popupRef = useRef(null)
    useOutside(popupRef, () => {
        if (isShow) {
            setTimeout(() => setIsShow(false), 50)
        }
        if (isShowUsers) {
            setTimeout(() => setIsShowUsers(false), 50)
        }

    })



    const addPostHandler = () => {
        var el = document.getElementById("REpost");
        // setPostText(el!.innerHTML)
        content_store.createNewPost(uuidv4(), parentPostId, el!.innerHTML, auth_store.user.id, auth_store.user.username, auth_store.user.full_name)
        el!.innerHTML = '';

    }

    const handleInsertGame = (name: string, link: string) => {
        var range = getCurrentRange()
        range!.setStart(range.startContainer, startValue)
        range!.setEnd(range.startContainer, endValue);
        range?.deleteContents()
        const newElement = document.createElement('span');
        newElement.innerHTML = `<a href="games/${link}">#${name}</a>`;
        range?.insertNode(newElement);
    };

    const handleInsertUser = (name: string, link: string) => {
        var range = getCurrentRange()
        range!.setStart(range.startContainer, startValueUsers)
        range!.setEnd(range.startContainer, endValueUsers);
        range?.deleteContents()
        const newElement = document.createElement('span');
        newElement.innerHTML = `<a href="/${link}">@${name}</a>`;
        range?.insertNode(newElement);
    };

    function getCaretCharacterOffsetWithin(element: any) {
        var caretOffset = 0;
        var doc = element.ownerDocument || element.document;
        var win = doc.defaultView || doc.parentWindow;
        var sel;
        if (typeof win.getSelection != "undefined") {
            sel = win.getSelection();
            if (sel.rangeCount > 0) {
                var range = win.getSelection().getRangeAt(0);
                var preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(element);
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                caretOffset = preCaretRange.toString().length;
            }
        } else if ((sel = doc.selection) && sel.type != "Control") {
            var textRange = sel.createRange();
            var preCaretTextRange = doc.body.createTextRange();
            preCaretTextRange.moveToElementText(element);
            preCaretTextRange.setEndPoint("EndToEnd", textRange);
            caretOffset = preCaretTextRange.text.length;
        }
        return caretOffset;
    }


    function getCurrentRange() {
        var range = window!.getSelection()!.getRangeAt(0).cloneRange();
        range.setStart(range.startContainer, Math.max(0, range.startOffset - 1));
        return range;
    }

    function showPopupAt(range?: any, distance?: any) {
        setStartValue(Math.max(0, range.startOffset - (distance || 0)))
        setEndValue(range.startOffset + 1)
        range.setStart(range.startContainer, Math.max(0, range.startOffset - (distance || 0)));
        range.setEnd(range.startContainer, range.startOffset + 1);
        // var rect = range.getBoundingClientRect();
        setIsShow(true)
    }

    function showPopupAtUsers(range?: any, distance?: any) {
        setStartValueUsers(Math.max(0, range.startOffset - (distance || 0)))
        setEndValueUsers(range.startOffset + 1)
        range.setStart(range.startContainer, Math.max(0, range.startOffset - (distance || 0)));
        range.setEnd(range.startContainer, range.startOffset + 1);
        // var rect = range.getBoundingClientRect();
        setIsShowUsers(true)

    }


    function toggleByDistance(range: any, key?: any) {
        var prev = range.startContainer.textContent.lastIndexOf('#', range.startOffset);
        var prevUser = range.startContainer.textContent.lastIndexOf('@', range.startOffset);

        if (prev > prevUser) {
            key = 'game'
        }
        else {
            key = 'user'
        }
        if (key === 'user') {

            var distanceUser = prevUser != -1 ? range.startOffset - prevUser : -1;
            if (distanceUser < 0 || distanceUser > 10) {
                //for example
                setStartSearchUser(false)
                setSearchQueryUser('')

            } else {
                showPopupAtUsers(range, distanceUser);
                setStartSearchUser(true)
            }
        }
        else {
            setIsShowUsers(false)

            var distance = prev != -1 ? range.startOffset - prev : -1;

            if (distance < 0 || distance > 10) {
                //for example
                setStartSearch(false)
                setSearchQuery('')
                return
            } else {
                showPopupAt(range, distance);
                setStartSearch(true)
            }
        }
    }

    function onKeyUp(e: any) {
        var range = getCurrentRange()
        var range2 = getCurrentRange()
        const textw = e.target.innerText
        var el = document.getElementById("REpost");
        setPostText(e.target.innerHTML)
        const position = getCaretCharacterOffsetWithin(el)
        if (startSearch) {
            const index = textw.replace(/\s+/g, ' ').trim().lastIndexOf('#', position)
            const query = textw.replace(/\s+/g, ' ').trim().slice(index + 1, position)

            setSearchQuery(query)
        }
        if (startSearchUser) {
            const index = textw.replace(/\s+/g, ' ').trim().lastIndexOf('@', position)
            const query = textw.replace(/\s+/g, ' ').trim().slice(index + 1, position)
            setSearchQueryUser(query)
        }
        if (e.key == '#') {
            setIsShowUsers(false)
            setStartSearchUser(false)

            showPopupAt(range);
            return
        } else {
            toggleByDistance(range, 'game');
        }

        if (e.key == '@') {
            setIsShow(false)
            setStartSearch(false)
            showPopupAtUsers(range2);

        } else {
            toggleByDistance(range2, 'user');
        }
    }


    return (

        <div className={styles.repost_text_filed}>
            <div id="REpost" contentEditable className={styles.input}
                data-placeholder="Введите текст..."
                onClick={() => toggleByDistance(getCurrentRange())}
                onKeyUp={(e) => onKeyUp(e)}>

            </div>
            {games_store.searchedGames.length ?
                <MentionPopup active={isShow} innerRef={popupRef}>
                    {games_store.searchedGames.map(game => (
                        <div key={game.id}>

                            <MentionButton onClick={() => (handleInsertGame(game.title, game.slug), setIsShow(false))} type={"button"}>
                                {game.title}
                            </MentionButton>
                        </div>

                    ))}
                </MentionPopup>
                : null}

            {content_store.users.length ?
                <MentionPopup active={isShowUsers} innerRef={popupRef}>
                    {content_store.users.map(user => (
                        <div key={user.id}>

                            <MentionButton onClick={() => (handleInsertUser(user.username, user.username), setIsShowUsers(false))} type={"button"}>
                                {user.username}
                            </MentionButton>
                        </div>

                    ))}
                </MentionPopup>
                : null
            }
            <div className={styles.border_line}>
            </div>
            <div className={styles.button_wrapper}>

                <ServiceButtonLong type={'button'}
                    onClick={() => (addPostHandler(), setPostText(''), setIsShowRepost(false))}>
                    Опубликовать
                </ServiceButtonLong>
            </div>

        </div>
    )

}

export default observer(RepostField)
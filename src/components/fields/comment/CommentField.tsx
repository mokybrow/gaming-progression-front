'use client'

import { Context } from "@/app/providers";
import { FunctionalGameButton } from "@/components/buttons/FunctionalGameButton";
import { SearchUserModel } from "@/models/userModel";
import { Mention, MentionItemTemplateOptions, MentionSearchEvent } from "primereact/mention";
import { useContext, useEffect, useRef, useState } from "react";
import styles from './comment.module.css'
import { observer } from "mobx-react-lite";
import ContentService from "@/services/contentService";
import useDebounce from "@/hooks/useDebounce";
import { MentionsInput } from "react-mentions";
import ReactMarkdown from "react-markdown";
import { unified } from "unified";
import remarkStringify from "remark-stringify";
import rehypeParse from "rehype-parse";
import { ProfilePopup } from "@/components/popup/ProfilePopup";
import useOutside from "@/hooks/useOutside";


export interface CommentProps {
  contentID: string
  parentCommentId: string | null
  setShowComment: any
}


function CommentField({ contentID, parentCommentId, setShowComment }: CommentProps) {

  const { content_store } = useContext(Context);
  const { auth_store } = useContext(Context);
  const { games_store } = useContext(Context);
  const [isShow, setIsShow] = useState(false);

  const [commentText, setCommentText] = useState<string>('');
  const [filter, setFilter] = useState();

  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearch = useDebounce(searchQuery, 1000);

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


  const popupRef = useRef(null)
  useOutside(popupRef, () => {
    if (isShow) {
      setTimeout(() => setIsShow(false), 50)
    }

  })
  const addCommentHandler = () => {

    content_store.addNewComment(contentID, commentText, parentCommentId, auth_store.user.id, auth_store.user.username, auth_store.user.full_name)
  }


  const InputHandler = (e: any) => {
    const text = e.target.innerHTML
    const textw = e.target.innerText
    console.log('Текст из поля', textw)
    // console.log(text)

    setCommentText(text)
    if (textw && textw.includes('#')) {
      const lastWord = textw.replace(/\s+/g, ' ').split(' ').pop()

      if (lastWord[0] === '#') {
        setSearchQuery(lastWord.trim().substring(1))
        setFilter(lastWord.trim().substring(1));
        if (games_store.searchedGames.length > 0) {
          setIsShow(true)
        }
        // console.log(filter)
        return;
      }
    }

  }

  const handleInsertGame = (name: string, link: string) => {
    var el = document.getElementById("conten")
    console.log(el?.innerText.replace(/\s+/g, ' ').split(' ').pop())
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    range?.deleteContents()
    const newElement = document.createElement('span');
    newElement.innerHTML = `<a href="games/${link}">${name}</a>`;
    range?.insertNode(newElement);

  };

  const handleInsertUser = (name: string, link: string) => {

    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    const newElement = document.createElement('span');
    newElement.innerHTML = `<a href="games/${link}">${name}</a>`;
    range?.insertNode(newElement);
  };


  return (

    <div className={styles.comment_field_wrapper}>

      <div
      id="conten"
        className={styles.input}
        onInput={InputHandler}
        data-placeholder="Введите текст..."
        contentEditable
      >
      </div>

      <ProfilePopup active={isShow} innerRef={popupRef}>
        {games_store.searchedGames.map(game => (
          <div key={game.id}>
            <button onClick={() => (handleInsertGame(game.title, game.slug), setIsShow(false))}>{game.title}</button>
          </div>
        ))}
      </ProfilePopup>

      <div className={styles.send_button_wrapper} >

        {commentText !== "" && commentText.replace(/\s+/g, ' ').trim() !== "" ?
          <div className={styles.func_button_wrapper}>
            <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={12}
              onClick={() => (addCommentHandler(), setShowComment(false), setCommentText(''))}
            >
              Отправить
            </FunctionalGameButton>
            <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={12}
              onClick={() => (setShowComment(false), setCommentText(''))}>
              Отмена
            </FunctionalGameButton>
          </div>
          :
          <div className={styles.func_button_wrapper}>
            <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={12}
              onClick={() => (setShowComment(false), setCommentText(''))}>
              Отмена
            </FunctionalGameButton>
          </div>
        }
      </div>

    </div>
  )

}


export default observer(CommentField)
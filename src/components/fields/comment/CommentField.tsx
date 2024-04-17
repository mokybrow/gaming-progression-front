'use client'

import { Context } from "@/app/providers";
import { FunctionalGameButton } from "@/components/buttons/FunctionalGameButton";
import { SearchUserModel } from "@/models/userModel";
import { Mention, MentionItemTemplateOptions, MentionSearchEvent } from "primereact/mention";
import { useContext, useState } from "react";
import styles from './comment.module.css'
import { observer } from "mobx-react-lite";

export interface CommentProps {
  contentID: string
  parentCommentId: string | null
  setShowComment: any
}

const itemTemplate = (suggestion: SearchUserModel) => {

  return (
    <div>
      <span className={styles.item_temlate_span}>
        {suggestion.username}
      </span>
    </div>
  );
}

function CommentField({ contentID, parentCommentId, setShowComment }: CommentProps) {

  const { content_store } = useContext(Context);
  const { auth_store } = useContext(Context);
  const { games_store } = useContext(Context);

  const [commentText, setCommentText] = useState<string>('');
  const [customers, setCustomers] = useState<any>([]);
  const [multipleSuggestions, setMultipleSuggestions] = useState<any>([]);



  const setCommentHandler = (event: any) => {
    setCommentText(event.value)
  }
  const addCommentHandler = () => {
    let newComment = commentText;
    if (newComment != '') {
      let comment = newComment.replace(/\s+/g, ' ').trim();
      const result = comment.replace(/(^|\W)@(\w+)/g, function (_, $1, $2) { return ` [@${$2}](/${$2})` })
      const finalComment = result.replace(/(^|\W)#(\S*)/g, function (_, $1, $2) { return ` [#${$2}](/games/${$2})` })
      content_store.addNewComment(contentID, finalComment, parentCommentId, auth_store.user.id, auth_store.user.username, auth_store.user.full_name)
  
    }
  }

  const onMultipleSearch = (event: MentionSearchEvent) => {
    const trigger = event.trigger;

    if (trigger === '@') {
      //in a real application, make a request to a remote url with the query and return suggestions, for demo we filter at client side
      setTimeout(() => {
        const query = event.query;
        let suggestions;
        if (query.trim() != '') {
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
        setMultipleSuggestions(suggestions);
      }, 500);
    }
    else if (trigger === '#') {
      setTimeout(() => {
        const query = event.query;
        let suggestions;
        if (query.trim() != '') {
          games_store.searchGames(event.query, 20)
        }
        else {
          games_store.setSearchedGames([])
        }

        if (!games_store.searchedGames.length) {
          suggestions = [...customers];
        }
        else {
          suggestions = games_store.searchedGames.filter(game => {
            return game.title;
          })
        }
        setMultipleSuggestions(suggestions);
      }, 500);

    }
  }



  const multipleItemTemplate = (suggestion: any, options: MentionItemTemplateOptions) => {
    const trigger = options.trigger;

    if (trigger === '@' && suggestion) {
      return itemTemplate(suggestion);
    }
    else if (trigger === '#' && !suggestion.username) {
      return (
        <div className={styles.game_item_wrapper}>
          <img src={suggestion.cover} alt="gameCover" />
          {suggestion.title}
        </div>
      );
    }

    return null;
  }


  return (

    <div className={styles.comment_field_wrapper}>


      <Mention value={commentText}
        onChange={(e) => setCommentHandler(e.target)} trigger={['@', '#']} suggestions={multipleSuggestions} onSearch={onMultipleSearch}
        field={['username', 'slug']} placeholder="Чтобы отметить пользователя наберите @, игру #" itemTemplate={multipleItemTemplate} rows={1} autoResize />
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
'use client'

import { Context } from "@/app/providers";
import { FunctionalGameButton } from "@/components/buttons/FunctionalGameButton";
import { SearchUserModel } from "@/models/userModel";
import { Mention, MentionItemTemplateOptions, MentionSearchEvent } from "primereact/mention";
import { useContext, useState } from "react";
import styles from './repost.module.css'
import { observer } from "mobx-react-lite";
import { v4 as uuidv4 } from 'uuid';
import { usePathname } from "next/navigation";

export interface PostFieldProps {
    parentPostId: string | null
    setIsShowRepost: any
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

function RepostField({ parentPostId, setIsShowRepost }: PostFieldProps) {

    const { content_store } = useContext(Context);
    const { games_store } = useContext(Context);
    const { auth_store } = useContext(Context);

    const [postText, setPostText] = useState<string>('');
    const [customers, setCustomers] = useState<any>([]);
    const [multipleSuggestions, setMultipleSuggestions] = useState<any>([]);

    const pathname = usePathname()
    const url = pathname.substring(pathname.lastIndexOf('/') + 1)

    const setPostHandler = (event: any) => {
        setPostText(event.value)
    }

    const addPostHandler = () => {
        let newPost = postText;

        let comment = newPost.replace(/\s+/g, ' ').trim();
        const result = comment.replace(/(^|\W)@(\w+)/g, function (_, $1, $2) { return ` [@${$2}](/${$2})` })
        const finalPost = result.replace(/(^|\W)#(\S*)/g, function (_, $1, $2) { return ` [#${$2}](/games/${$2})` })
        content_store.createNewPost(uuidv4(), parentPostId, finalPost, auth_store.user.id, auth_store.user.username, auth_store.user.full_name, url)


    }

    const onMultipleSearch = (event: MentionSearchEvent) => {
        const trigger = event.trigger;

        if (trigger === '@') {
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

        <div className={styles.repost_text_filed}>
            <Mention value={postText}
                onChange={(e) => setPostHandler(e.target)} trigger={['@', '#']} suggestions={multipleSuggestions} onSearch={onMultipleSearch}
                field={['username', 'slug']} placeholder="Напишите ваш ответ или сохраните на стену" itemTemplate={multipleItemTemplate} rows={3} autoResize
                className={styles.mention} />

            <div className={styles.border_line}>
            </div>
            <div className={styles.button_wrapper}>

                <FunctionalGameButton type={'button'} bg_color={'#0368CD'} fontSize={14} color={'#E8E8ED'}
                    onClick={() => (addPostHandler(), setPostText(''), setIsShowRepost(false))}>
                    Опубликовать
                </FunctionalGameButton>
            </div>

        </div>
    )

}

export default observer(RepostField)
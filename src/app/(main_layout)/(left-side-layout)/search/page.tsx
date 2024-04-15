"use client"

import { FC, forwardRef, useContext, useEffect, useRef, useState } from 'react'
import styles from './page.module.css'
import { TypeInputProps } from './field.type'
import { ProfilePopup } from '@/components/popup/ProfilePopup';
import useOutside from '@/hooks/useOutside';
import { Context } from '@/app/providers';
import useDebounce from '@/hooks/useDebounce';
import { observer } from 'mobx-react-lite';
import { SearchPopup } from '@/components/popup/SearchPopup';
import Link from 'next/link';
import Image from 'next/image'
import { SubmitButton } from '@/components/buttons/SubmitButton';


const Search = () => {
    const [isShow, setIsShow] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { games_store } = useContext(Context);

    const popupRef = useRef(null)

    useOutside(popupRef, () => {
        if (isShow) {
            setTimeout(() => setIsShow(false), 50)
        }
    })

    const debouncedSearch = useDebounce(searchQuery, 1000);

    useEffect(() => {
        //search the api
        async function fetchData() {
            games_store.searchGames(String(debouncedSearch), games_store.searchLimit)
        }
        if (debouncedSearch) {
            fetchData()
            setIsShow(true)

        }
        else {
            games_store.setSearchedGames([])
        }

    }, [debouncedSearch])

    const NewOffset = () => {
        games_store.incrementSearchLimit()
        games_store.searchGames(searchQuery, games_store.searchLimit)
    }

    return (
        <>
            <main className="content_wrapper">
                <div className={styles.input_wrapper}>
                    <input   className={styles.form_input}
                        type={'text'}
                        id={'search'} required
                        onChange={(e) => setSearchQuery(e.target.value)} onClick={() => games_store.searchedGames.length > 0 ? setIsShow(true) : null} value={searchQuery} />
                    <label htmlFor={'search'}>Поиск</label>
                    {searchQuery ?

                        <div className={styles.send_button_wrapper}>
                            <div className={styles.clear_field_button} onClick={() => (setSearchQuery(''), setIsShow(false), games_store.setSearchGamesCount({ game_count: 0 }),
                                games_store.setSearchLimit(10))}>
                            </div>
                        </div>
                        : null
                    }

                </div>
                <div>
                    {isShow ?
                        <span>Найдено совпадений {games_store.gamesSearchCount.game_count}</span>
                        : null}
                </div>
                <div className={styles.search_result}>
                    {games_store.searchedGames.length ?
                        <>
                            {games_store.searchedGames.map(game => (
                                <Link href={`/games/${game.slug}`} className={styles.game_list_item} key={game.id}>
                                    <div className={styles.game_cover_wrapper}>
                                        <img src={game.cover} alt={'game cover'} />
                                    </div>
                                    {game.title}
                                </Link>

                            ))}
                        </>
                        :
                        <>
                            {isShow ? <span>По вашему запросу ничего не найдено</span> : null}
                        </>}
                    <div className={styles.show_more_button}>

                        {games_store.gamesSearchCount.game_count > 10 && games_store.searchLimit < games_store.gamesSearchCount.game_count ?
                            <SubmitButton type={'button'} onClick={() => NewOffset()}>Показать ещё</SubmitButton>
                            : null}
                    </div>
                </div>
            </main>
            <main className="right_side_wrapper">
            </main>
        </>
    )
}



export default observer(Search)
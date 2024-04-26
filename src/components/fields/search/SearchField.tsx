import { forwardRef, useContext, useEffect, useRef, useState } from 'react'
import styles from './search.module.css'
import { TypeInputProps } from '../field.type'
import { ProfilePopup } from '@/components/popup/profile/ProfilePopup';
import useOutside from '@/hooks/useOutside';
import { Context } from '@/app/providers';
import useDebounce from '@/hooks/useDebounce';
import { observer } from 'mobx-react-lite';
import { SearchPopup } from '@/components/popup/SearchPopup';
import Link from 'next/link';
import Image from 'next/image'


const SearchField = forwardRef<HTMLInputElement, TypeInputProps>(
    ({ type, placeholder, id, width, height, labelname, ...rest }, ref) => {
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
                games_store.searchGames(String(debouncedSearch), 10)
            }
            if (debouncedSearch) {
                fetchData()
                setIsShow(true)
            }
            else {
                games_store.setSearchedGames([])
            }

        }, [debouncedSearch, games_store])

        return (
            <>
                <div className={styles.input_wrapper}>
                    <input ref={ref} {...rest} className={styles.form_input}
                        type={type}
                        id={id} style={{ width: `${width}px`, height: `${height}px` }} required
                        onChange={(e) => setSearchQuery(e.target.value)} onClick={() => games_store.searchedGames.length > 0 ? setIsShow(true) : null} value={searchQuery} />
                    <label htmlFor={id}>{labelname}</label>
                    {searchQuery ?

                        <div className={styles.send_button_wrapper}>
                            <div className={styles.clear_field_button} onClick={() => setSearchQuery('')}>
                            </div>
                        </div>
                        : null
                    }
                    <SearchPopup active={isShow} innerRef={popupRef}>
                        <div className={styles.search_result}>
                            {games_store.searchedGames.length ?
                                <>
                                    {games_store.searchedGames.map(game => (
                                        <div key={game.id} className={styles.game_list_item}>
                                            <div className={styles.game_cover_wrapper}>
                                                <img src={game.cover} alt={'game cover'} />
                                            </div>

                                            <Link href={`/games/${game.slug}`} onClick={() => setIsShow(false)}>
                                                {game.title}
                                            </Link>
                                        </div>
                                    ))}
                                </>
                                :
                                <span>По вашему запросу ничего не найдено</span>
                            }
                        </div>
                    </SearchPopup>
                </div>

            </>
        )
    }
)

SearchField.displayName = 'SearchField'

export default observer(SearchField)
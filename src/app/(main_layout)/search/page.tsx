"use client"

import { FC, forwardRef, useContext, useEffect, useRef, useState } from 'react'
import styles from './page.module.css'
import useOutside from '@/hooks/useOutside';
import { Context } from '@/app/providers';
import useDebounce from '@/hooks/useDebounce';
import { observer } from 'mobx-react-lite';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation'; import Link from 'next/link';

import InputField from '@/components/fields/input/InputField';
import CrossIcon from '@/components/icons/cross';
import { Suspense } from 'react'


const Search = observer(() => {

    const searchParams = useSearchParams();
    const search = searchParams.get('query')
    const pathname = usePathname();
    const { replace } = useRouter();

    const [page, setPage] = useState<number>(0)
    const [fetching, setFetching] = useState(true)

    const [searchQuery, setSearchQuery] = useState('');
    const { games_store } = useContext(Context);



    const debouncedSearch = useDebounce(searchQuery, 1000);

    useEffect(() => {
        if (search !== null) {
            setSearchQuery(search)
        }
        //search the api
        async function fetchData() {
            games_store.setSearchedGames([])
            games_store.searchGames(String(debouncedSearch), 0)
        }
        if (debouncedSearch) {
            fetchData()
            const params = new URLSearchParams(searchParams);
            if (debouncedSearch) {
                params.set('query', String(debouncedSearch));
            } else {
                params.delete('query');
            }
    
            replace(`${pathname}?${params.toString()}`);
        }
        else {
            games_store.setSearchedGames([])
        }

    }, [debouncedSearch])



    useEffect(() => {
        if (fetching) {
            try {

                games_store.searchGames(searchQuery, page).then(resp => {
                    setPage(page + 20)
                }).finally(() => setFetching(false))

            } catch (error) {

            }
        }


    }, [fetching])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }

    }, [])


    const scrollHandler = (e: any) => {
        if (e.target.documentElement.scrollHeight -
            (e.target.documentElement.scrollTop + window.innerHeight) < 100
            && games_store.searchedGames.length < games_store.gamesSearchCount
        ) {

            setFetching(true)
        }

    }


    const handleSearch = (term: any) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }

        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <>
            <main className="main_content_wrapper">
                <div className={styles.input_wrapper}>
                    <InputField type={'text'} id={'search'} labelname={'Поиск'}
                        onChange={(e) => (setSearchQuery(e.target.value))}

                        value={searchQuery} />
                    {searchQuery ?

                        <div className={styles.send_button_wrapper}>
                            <div className={styles.clear_field_button} onClick={() => (handleSearch(''), setSearchQuery(''),
                                games_store.setSearchedGames([]))}>
                                <CrossIcon className='general-icon' />
                            </div>
                        </div>
                        : null
                    }
                </div>



                {searchQuery.trim() !== '' ?

                    <div className={styles.content_wrapper}>
                        {games_store.searchedGames.length ?
                            <span>Найдено совпадений {games_store.gamesSearchCount}</span>
                            : null}

                        {games_store.searchedGames.length ?
                            <>
                                {games_store.searchedGames.map(game => (
                                    <Link href={`/games/${game.slug}`} className={styles.game_list_item} key={game.id}>
                                        <div className={styles.game_cover_wrapper}>
                                            {game.cover ?
                                                <img src={game.cover} alt={'game cover'} width={50} height={50} />
                                                : <div className={styles.game_cover_not_fount}><small>N/A</small></div>}
                                        </div>
                                        {game.title}
                                    </Link>

                                ))}
                            </>
                            :
                            <>
                                {searchQuery.trim() !== '' ? <span>По вашему запросу ничего не найдено</span> : null}
                            </>}

                    </div>
                    : null}
            </main>
        </>
    )
})

export default function SearchPage() {
    return (
        // You could have a loading skeleton as the `fallback` too
        <Suspense>
            <Search />
        </Suspense>
    )
}

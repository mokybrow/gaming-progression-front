'use client'

import { Context } from "@/app/providers";
import { useContext, useEffect, useRef, useState } from "react";
import styles from './page.module.css'
import GameCard from "@/components/cards/game_card/GameCard";
import React from "react";
import FiltersCard from "@/components/cards/filters/FiltersCard";
import { observer } from "mobx-react-lite";
import { ProfilePopup } from "@/components/popup/profile/ProfilePopup";
import useOutside from "@/hooks/useOutside";

import { FullScreenPopup } from "@/components/popup/main_popup/FullScreenPopup";
import CircleLoader from "@/components/loader/circle";
import FilterIcon from "@/components/icons/filter";
import SortIcon from "@/components/icons/sort";
import SortButton from "@/components/buttons/sort/SortButton";
import { GamesResponse } from "@/models/gamesModel";



const columnGenerator = (start: number, every: number, games: GamesResponse[]) => {
    let content = [];
    for (let i = start; i < games.length; i += every) {
        const game = games[i];
        content.push(
            <div key={game.id} >
                <GameCard  title={game.title} cover={game.cover}
                    release_date={game.release_date} avg_rate={game.avg_rate}
                    platforms={game.platforms} genres={game.genres} slug={game.slug} />
            </div>

        );
    }
    return content;
};


function Games() {
    const { games_store } = useContext(Context);
    const [isShow, setIsShow] = useState(false);

    const [isShowFilter, setIsShowFilter] = useState(false);
    const popupRef = useRef(null)
    const [page, setPage] = useState<number>(20)
    const [fetching, setFetching] = useState(false)

    useOutside(popupRef, () => {
        if (isShow) {
            setTimeout(() => setIsShow(false), 50)
        }
        if (isShowFilter) {
            setTimeout(() => setIsShowFilter(false), 50)
        }
    })

    useEffect(() => {
        if (games_store.games.length < 20) {

            games_store.getAllGames(games_store.genres, games_store.platforms, null, games_store.releaseDate, 0, games_store.sort)
        }


    }, [games_store])

    useEffect(() => {
        if (fetching) {
            try {
                games_store.getAllGamesScroll(games_store.genres, games_store.platforms, null, games_store.releaseDate, page, games_store.sort).then(resp => {
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
            (e.target.documentElement.scrollTop + window.innerHeight) < 500
            && games_store.games.length < games_store.gamesCount
        ) {
            setFetching(true)
            games_store.setLoading(true)
        }

    }
    return (
        <>

            <FullScreenPopup active={isShowFilter} setActive={setIsShowFilter}>
                <FiltersCard setIsShow={setIsShowFilter} />
            </FullScreenPopup>
            <main className="main_content_wrapper">
                <div className={styles.sort_wrapper} >
                    <div className={styles.sort_button_wrapper} >
                        <SortButton onClick={() => setPage(0)} />
                        {games_store.gamesCount > 0 ?
                            <div className={styles.finded_games}>Найдено игр {games_store.gamesCount}</div>
                            :
                            <div className={styles.finded_games}>Игры не найдены</div>

                        }
                        <div className={styles.right_side_flex_mobile}>
                            <div className={styles.filter_button_wrapper_desk} >
                                <div className={styles.filter_button} onClick={() => setIsShowFilter(true)}>
                                    <div className={styles.icon_wrapper}>
                                        <FilterIcon className="general-icon" />
                                    </div>
                                    <span>Фильтры</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.right_side_flex_mobile}>
                    {games_store.gamesCount > 0 ?
                        <div className={styles.finded_games}>Найдено игр {games_store.gamesCount}</div>
                        :
                        <div className={styles.finded_games}>Игры не найдены</div>

                    }
                </div>
                {games_store.gamesCount > 0 ?
                    <>
                        <div className={styles.cards_layout_three}>
                            <div className={styles.column_layout} id="firs_column">
                                {columnGenerator(0, 3, games_store.games)}
                            </div>
                            <div className={styles.column_layout} id="second_column">
                                {columnGenerator(1, 3, games_store.games)}
                            </div>
                            <div className={styles.column_layout} id="third_column">
                                {columnGenerator(2, 3, games_store.games)}
                            </div>

                        </div >
                        <div className={styles.cards_layout_two}>
                            <div className={styles.column_layout} id="second_column">
                                {columnGenerator(0, 2, games_store.games)}
                            </div>
                            <div className={styles.column_layout} id="third_column">
                                {columnGenerator(1, 2, games_store.games)}
                            </div>
                        </div >
                        <div className={styles.cards_layout_one}>
                            <div className={styles.column_layout} id="second_column">
                                {columnGenerator(0, 1, games_store.games)}
                            </div>

                        </div >
                    </>
                    : <><div>Игры не найдены</div></>}
                {games_store.isLoading ? <>

                    <CircleLoader />
                </> : null}
            </main >

            <div className="right_side_wrapper">
                <div className={styles.right_side_flex}>
                    <div className={styles.filter_button_wrapper_desk} >
                        <div className={styles.filter_button}>
                            <div className={styles.icon_wrapper}>
                                <FilterIcon className="general-icon" />
                            </div>
                            <span>Фильтры</span>
                        </div>
                    </div>
                    <div className={styles.filters_wrapper}>
                        <FiltersCard setIsShow={setIsShowFilter} />
                    </div>
                </div>
                <div className={styles.sort_wrapper_mobile} >
                    <div className={styles.sort_button_wrapper} >
                        <SortButton onClick={() => setPage(0)} />
                        {games_store.gamesCount > 0 ?
                            <div className={styles.finded_games}>Найдено игр {games_store.gamesCount}</div>
                            :
                            <div className={styles.finded_games}>Игры не найдены</div>

                        }
                        <div className={styles.right_side_flex_mobile}>
                            <div className={styles.filter_button_wrapper_desk} >
                                <div className={styles.filter_button} onClick={() => setIsShowFilter(true)}>
                                    <div className={styles.icon_wrapper}>
                                        <FilterIcon className="general-icon" />
                                    </div>
                                    <span>Фильтры</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </div>

        </>

    );
}


export default observer(Games)
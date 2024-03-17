'use client'

import { Context } from "@/app/providers";
import { useContext, useEffect, useRef, useState } from "react";
import styles from './page.module.css'
import GameCard from "@/components/cards/GameCard";
import React from "react";
import FiltersCard from "@/components/cards/filters/FiltersCard";
import { observer } from "mobx-react-lite";
import { ProfilePopup } from "@/components/popup/ProfilePopup";
import useOutside from "@/hooks/useOutside";
import { SubmitButton } from "@/components/buttons/SubmitButton";
import { useResize } from "@/hooks/useResize";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'



const getAnimalsContent = (start: number, every: number, games: string | any[]) => {
    let content = [];
    for (let i = start; i < games.length; i += every) {
        const game = games[i];
        content.push(
            <div key={game.id}>

                <GameCard key={game.id} title={game.title} cover={game.cover}
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
    const width = useResize();

    useOutside(popupRef, () => {
        if (isShow) {
            setTimeout(() => setIsShow(false), 50)
        }

    })

    useEffect(() => {
        games_store.getAllGames(null, null, null, null, 21, 0, {
            "name": "title",
            "type": "asc"
        })
    }, [games_store])

    const SubmitSort = (name: string, type: string) => {
        games_store.setSort(name, type)
        games_store.getAllGames(games_store.genres, games_store.platforms, null, games_store.release_date, games_store.limit, 0, games_store.sort)
    }
    const NewOffset = () => {
        games_store.incrementLimit()
        games_store.getAllGames(games_store.genres, games_store.platforms, null, games_store.release_date, games_store.limit, 0, games_store.sort)
    }

    return games_store.isLoading ? (
        <>
            <main className="content_wrapper">
                <div className={styles.cards_layout_three}>

                    <Skeleton count={1} height={250} />
                    <Skeleton count={1} height={250} />
                    <Skeleton count={1} height={250} />
                    <Skeleton count={1} height={250} />
                    <Skeleton count={1} height={250} />
                    <Skeleton count={1} height={250} />
                    <Skeleton count={1} height={250} />
                    <Skeleton count={1} height={250} />
                    <Skeleton count={1} height={250} />

                </div>
            </main>
            <main className="right_side_wrapper">
                <Skeleton count={1} height={500} />
            </main>
        </>
    )

        : (
            <>
                <main className="content_wrapper">
                    <div className={styles.cards_layout_three}>
                        <div className={styles.help_line}>
                            <div className={styles.sort_button_wrapper} >
                                <div className={styles.sort_button} onClick={() => setIsShow(!isShow)}>
                                    <div className={styles.sort_icon}></div>
                                    <span>Сортировка</span>
                                </div>
                            </div>
                            <div className={styles.popup_wrapper}>
                                <ProfilePopup active={isShow} innerRef={popupRef}>
                                    <div className={styles.popup_elem} onClick={() => { SubmitSort('title', 'asc'), setIsShow(!isShow) }}>от А до Я</div>
                                    <div className={styles.popup_elem} onClick={() => { SubmitSort('title', 'desc'), setIsShow(!isShow) }}>от Я до А</div>
                                    <div className={styles.popup_elem} onClick={() => { SubmitSort('release_date', 'asc'), setIsShow(!isShow) }}>Сначала старые</div>
                                    <div className={styles.popup_elem} onClick={() => { SubmitSort('release_date', 'desc'), setIsShow(!isShow) }}>Сначала новые</div>
                                </ProfilePopup>
                            </div>
                        </div>
                        {
                            Number(width?.width) < 840 ? <>
                                <div className={styles.column_layout} id="firs_column">
                                    {getAnimalsContent(0, 2, games_store.games)}
                                </div>
                                <div className={styles.column_layout} id="second_column">
                                    {getAnimalsContent(1, 2, games_store.games)}
                                </div>

                            </> : <>
                                <div className={styles.column_layout} id="firs_column">
                                    {getAnimalsContent(0, 3, games_store.games)}
                                </div>
                                <div className={styles.column_layout} id="second_column">
                                    {getAnimalsContent(1, 3, games_store.games)}
                                </div>
                                <div className={styles.column_layout} id="third_column">
                                    {getAnimalsContent(2, 3, games_store.games)}
                                </div>
                            </>
                        }

                        <div className={styles.show_more_button}>
                            <SubmitButton type={'button'} onClick={() => NewOffset()}>Показать ещё</SubmitButton>
                        </div>
                    </div >


                </main >

                <main className="right_side_wrapper">
                    <div className={styles.filters_wrapper}>
                        <div className={styles.help_line}>
                            <div className={styles.sort_button_wrapper} >

                                <div className={styles.filter_button} onClick={() => setIsShowFilter(!isShowFilter)}>
                                    <div className={styles.filter_icon}></div>
                                    <span>Фильтры</span>
                                </div>
                            </div>
                        </div>
                        <div className={isShowFilter ? styles.filters_block_active : styles.filters_block}>
                            <FiltersCard />
                        </div>
                    </div>

                </main>
            </>

        );
}


export default observer(Games)
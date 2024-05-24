'use client'

import monthCalendar from "@/services/monthCalendar";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from './page.module.css'
import ContentService from "@/services/contentService";
import { GamesResponse, GamesResponseCalendar } from "@/models/gamesModel";
import { PostPopUp } from "@/components/popup/posts/PostPopUp";
import LeavePostCard from "@/components/cards/service/LeavePostCard";
import Link from "next/link";
import ArrowLeftIcon from "@/components/icons/arrowLeft";
import ArrowRightIcon from "@/components/icons/arrowRight";
import Image from 'next/image'

export type CalendarResp = {
    month: Array<Array<number>>,

    year: number,
}

export type Calendar = (_year: number, _month: number) => CalendarResp;

export default function CalendarPage() {
    let month = new Date().getMonth();
    let year = new Date().getFullYear();

    const [currentMonth, setCurrentMonth] = useState<number>(month);
    const [currentYear, setCurrentYear] = useState<number>(year);
    const [calendar, setCalendar] = useState<CalendarResp>();
    const [games, setGames] = useState<GamesResponseCalendar[]>();
    const [isShowPost, setIsShowPost] = useState(false);
    const [globlDay, setGlobalDay] = useState<number>(1);

    var today = new Date();
    today.setMonth(currentMonth);
    today.setFullYear(currentYear);

    useEffect(() => {
        const calendar = monthCalendar(Number(currentYear), Number(currentMonth))
        setCalendar(calendar)
        const event = new Date(`${currentMonth + 1}.01.${currentYear}`);
        const jsonDate = event.toJSON();

        const maxValue = Math.max.apply(null, calendar.month[calendar.month.length - 1]);
        ContentService.getGamesByMonth(jsonDate, maxValue).then(resp =>
            setGames(resp.data)
        ).catch(err => setGames([]))


    }, [currentMonth, currentYear])

    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
    }
    const week_days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

    const prevMonth = () => {
        if (currentMonth > 1) {
            setCurrentMonth(currentMonth - 1)
            // setCurrentDate(currentDate.getMonth() - 1)
        }
        else {
            setCurrentMonth(11)
            setCurrentYear(currentYear - 1)
        }
    }
    const nextMonth = () => {
        if (currentMonth < 11) {
            setCurrentMonth(currentMonth + 1)
        }
        else {
            setCurrentMonth(0)
            setCurrentYear(currentYear + 1)
        }
    }
    const showGameList = (day: number) => {
        setIsShowPost(true)
        setGlobalDay(day)

    }
    return (
        <>
            <PostPopUp active={isShowPost} setActive={setIsShowPost}>
                <LeavePostCard setIsShow={setIsShowPost} />
                <div className={styles.card_wrapper}>
                    {games?.map(
                        (game, index) => (
                            <>
                                {
                                    game[globlDay]?.map(item => (
                                        <Link href={`/games/${item.slug}`} className={styles.game_list_item} key={item.id}>
                                            <div className={styles.game_cover_wrapper}>
                                                {item.cover ?
                                                    <Image
                                                        src={item.cover}
                                                        alt="Picture of the author"
                                                        width={50}
                                                        height={50}
                                                    />
                                                    : <div className={styles.game_cover_not_fount}><small>N/A</small></div>}
                                            </div>
                                            {item.title}
                                        </Link>
                                    ))
                                }
                            </>
                        )
                    )}
                </div>
            </PostPopUp>
            <main className="main_content_wrapper">
                <div className={styles.control_wrapper}>
                    <div className={styles.icon_wrapper} onClick={() => prevMonth()}>
                        <ArrowLeftIcon className='general-icon' />
                    </div>

                    <div>{today.toLocaleDateString([], options)}</div>

                    <div className={styles.icon_wrapper} onClick={() => nextMonth()}>
                        <ArrowRightIcon className='general-icon' />
                    </div>
                </div>
                <div>
                    <div className={styles.calendar_grid_week_days}>
                        {week_days.map(day => (
                            <div key={day} className={styles.day_wrapper_week}>
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className={styles.calendar_grid}>
                        {calendar?.month?.map((week, index) => (
                            <>
                                {week.map((day, index) => (
                                    <div key={index} className={styles.day_wrapper} onClick={() => showGameList(day)}>
                                        {day === 0 ? null :
                                            <>
                                                <div className={styles.calendar_block_wrapper}>
                                                    <div className={styles.day_number}>
                                                        {day}
                                                    </div>
                                                    <div className={styles.games_list_wrapper}>
                                                        {games?.map(
                                                            (game, index) => (
                                                                <div className={styles.games_list} key={index}>
                                                                    <div className={styles.desktop_block}>
                                                                        {game[day]?.length > 1 ?
                                                                            <div className={styles.block}>
                                                                                {game[day]?.slice(0, 2).map((item, index) => (
                                                                                    <div className={styles.game_cover_wrapper_calendar} key={item.id}
                                                                                        style={{ position: 'absolute', left: `calc(5px + ${index * 18}px)` }}>
                                                                                        {item.cover ?
                                                                                            <img src={item.cover} alt={'game cover'} width={50} height={50} />
                                                                                            : <div className={styles.game_cover_not_fount}><small>N/A</small></div>}
                                                                                    </div>
                                                                                ))}
                                                                                {game[day]?.length > 2 ?
                                                                                    <div className={styles.more_items} style={{ position: 'absolute', left: `calc(5px + ${2 * 18}px)` }}>
                                                                                        +{game[day]?.length - 2}
                                                                                    </div>
                                                                                    : null}
                                                                            </div>
                                                                            :
                                                                            <>
                                                                                {game[day]?.slice(0, 1).map(item => (
                                                                                    <div className={styles.game_cover_wrapper_calendar} key={item.id}>
                                                                                        {item.cover ?
                                                                                            <img src={item.cover} alt={'game cover'} width={50} height={50} />
                                                                                            : <div className={styles.game_cover_not_fount}><small>N/A</small></div>}
                                                                                    </div>
                                                                                ))}
                                                                            </>
                                                                        }
                                                                    </div>
                                                                    <div className={styles.mobile_block}>
                                                                        {game[day]?.length > 1 ?
                                                                            <div className={styles.block}>
                                                                                {game[day]?.slice(0, 1).map((item, index) => (
                                                                                    <div className={styles.game_cover_wrapper_calendar_mobile} key={item.id}>
                                                                                        {item.cover ?
                                                                                            <img src={item.cover} alt={'game cover'} width={50} height={50} />
                                                                                            : <div className={styles.game_cover_not_fount}><small>N/A</small></div>}
                                                                                    </div>
                                                                                ))}
                                                                                {game[day]?.length > 2 ?
                                                                                    <div className={styles.more_items_mobile} style={{ position: 'absolute', left: `calc(5px + ${1 * 8}px)` }}>
                                                                                        +{game[day]?.length - 1}
                                                                                    </div>
                                                                                    : null}
                                                                            </div>
                                                                            :
                                                                            <>
                                                                                {game[day]?.slice(0, 1).map(item => (
                                                                                    <div className={styles.game_cover_wrapper_calendar} key={item.id}>
                                                                                        {item.cover ?
                                                                                            <img src={item.cover} alt={'game cover'} width={50} height={50} />
                                                                                            : <div className={styles.game_cover_not_fount}><small>N/A</small></div>}
                                                                                    </div>
                                                                                ))}
                                                                            </>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        }

                                    </div>
                                ))}
                            </>

                        ))}
                    </div>
                </div>
                <div>


                </div>

            </main>
            <div className="right_side_wrapper">
            </div>
        </>
    );
}

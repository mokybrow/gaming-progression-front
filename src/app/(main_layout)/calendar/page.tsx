'use client'

import monthCalendar from "@/services/monthCalendar";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from './page.module.css'

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

    var today = new Date();
    today.setMonth(currentMonth);
    today.setFullYear(currentYear);

    useEffect(() => {
        const calendar = monthCalendar(Number(currentYear), Number(currentMonth))
        setCalendar(calendar)

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
            setCurrentMonth(1)
            setCurrentYear(currentYear + 1)

        }

    }
    return (
        <main className="main_content_wrapper">
            <div className={styles.control_wrapper}>
                <button onClick={() => prevMonth()}>
                    Назад
                </button>
                <div>{today.toLocaleDateString([], options)}</div>
                <button onClick={() => nextMonth()}>
                    Вперёд
                </button>
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

                    {calendar?.month?.map(week => (
                        <>
                            {week.map((day, index) => (
                                <div key={index} className={styles.day_wrapper}>
                                    {day === 0 ? null :
                                        <>
                                            {day}
                                        </>
                                    }
                                </div>
                            ))}
                        </>
                    ))}
                </div>
            </div>
        </main>
    );
}

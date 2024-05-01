'use client'

import { observer } from "mobx-react"
import styles from './calendar.module.css'
import { useContext, useState } from "react"
import SendIcon from "../icons/send"
import { Context } from "@/app/providers"

export interface CalendarProps {
    birthdate: string
    setBirthOpen: any

}


function Calendar({ birthdate, setBirthOpen }: CalendarProps) {

    const [date, setDate] = useState<string>(birthdate)
    const { auth_store } = useContext(Context);

    const dateChange = (event: any) => {
        setDate(event.target.value)
   
    }

    return (
        <>
            <div className={styles.calendar_wrapper}>


                <input className={styles.calendar} type="date" data-date-format="DD MMMM YYYY" value={date}
                    onChange={(e) => dateChange(e)}></input>

                {date != null ?
                    <div className={styles.icon_wrapper} onClick={() => (auth_store.patchMe(null, null, new Date(date).toJSON()), setBirthOpen(false))} >
                        <SendIcon className="general-icon" />
                    </div>
                    : null
                }

            </div>
        </>
    )

}

export default observer(Calendar)
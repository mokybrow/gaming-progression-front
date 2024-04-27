"use client"

import { Context } from "@/app/providers";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import styles from './page.module.css'
import Link from "next/link";
import { FunctionalGameButton } from "@/components/buttons/FunctionalGameButton";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ruRU } from '@mui/x-date-pickers/locales';

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { observer } from "mobx-react-lite";
import SettingsField from "@/components/fields/settings/SettingsField";
import { formatDate } from "@/services/dateFormat";
import ArrowLeftIcon from "@/components/icons/arrowLeft";

function SettingsMe() {
    const [fullName, setFullName] = useState("");
    const [biography, setBiography] = useState("");
    const [birthDate, setBirthDate] = useState<Dayjs | null>();
    const { auth_store } = useContext(Context);

    const [birthOpen, setBirthOpen] = useState(false);

    return (
        <>
            <main className="content_wrapper">
                <div className={styles.main_wrapper}>
                    <div className={styles.settings_header}>
                        <Link href={'/settings/'}>
                            <div className={styles.icon_wrapper}>
                                <ArrowLeftIcon className='general-icon'/>
                            </div>
                            <span>Назад</span>
                        </Link>
                    </div>
                    <hr />
                    <div className={styles.settings_content}>

                        <div className={styles.comment_field_wrapper}>
                            <SettingsField value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Отображаемое имя"
                                maxLength={25} />
                            {fullName !== "" && fullName.replace(/\s+/g, ' ').trim() !== "" ? <>

                                <div className={styles.send_button_wrapper}>
                                    <div>
                                        <small>{fullName.length}/25</small>
                                    </div>
                                    <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={12}
                                        onClick={() => (auth_store.patchMe(fullName, null, null), setFullName(''))}>
                                        Обновить
                                    </FunctionalGameButton>

                                </div>
                            </> : null}

                        </div>

                        <div className={styles.comment_field_wrapper}>
                            <SettingsField value={biography}
                                onChange={(e) => setBiography(e.target.value)}
                                placeholder="Расскажите о себе"
                                maxLength={50} />
                            {biography !== "" && biography.replace(/\s+/g, ' ').trim() !== "" ? <>
                                <div className={styles.send_button_wrapper}>
                                    <div>
                                        <small>{biography.length}/50</small>
                                    </div>
                                    <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={12}
                                        onClick={() => (auth_store.patchMe(null, biography, null), setBiography(''))}>
                                        Обновить
                                    </FunctionalGameButton>
                                </div>
                            </> : null}
                        </div>
                        <div className={birthOpen ? styles.birth_close : styles.birthdate_wrapper}>
                            <span className={styles.birth_date_header}>Дата рождения</span>
                            {auth_store.user.birthdate ?
                                <>
                             
                                        <span>
                                            {formatDate(auth_store.user.birthdate)}
                                        </span>

                                </> : <><span>Нет данных</span></>}
                            <small className={styles.change_link_color} onClick={() => setBirthOpen(true)}>Изменить</small>
                        </div>
                        <div className={birthOpen ? styles.birth_open : styles.birth_close}>
                            <div className={styles.date_and_cross}>

                                <LocalizationProvider dateAdapter={AdapterDayjs} localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}>
                                    <DatePicker value={birthDate} onChange={(newValue) => (setBirthDate(newValue))} />
                                </LocalizationProvider>
                                <div className={styles.x_icon} onClick={() => (setBirthOpen(false), setBirthDate(null))}></div>
                            </div>
                            {birthDate != null ?
                                <>
                                    <FunctionalGameButton type={'button'} bg_color={'#D6D6D6'} fontSize={16}
                                        onClick={() => (auth_store.patchMe(null, null, birthDate.toJSON()), setBirthDate(null), setBirthOpen(false))}>
                                        Обновить
                                    </FunctionalGameButton>
                                </>
                                : <></>}
                        </div>
                    </div>
                </div>

            </main>
            <main className="right_side_wrapper">
           
            </main>

        </>
    );
}


export default observer(SettingsMe)
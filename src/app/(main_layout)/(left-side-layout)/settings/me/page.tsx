"use client"

import { Context } from "@/app/providers";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import styles from './page.module.css'
import Link from "next/link";
import CommentField from "@/components/fields/comment/CommentField";
import { FunctionalGameButton } from "@/components/buttons/FunctionalGameButton";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ruRU } from '@mui/x-date-pickers/locales';
import { ukUA } from '@mui/x-date-pickers/locales';

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { FormattedDate } from "react-intl";
import { observer } from "mobx-react-lite";

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
                            <div className={styles.arrow_back}></div>
                            <span>Назад</span>
                        </Link>
                    </div>
                    <hr />
                    <div className={styles.settings_content}>

                        <div className={styles.comment_field_wrapper}>
                            <CommentField value={fullName}
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
                            <CommentField value={biography}
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
                                    <FormattedDate
                                        value={auth_store.user.birthdate}
                                        year='numeric'
                                        month='long'
                                        day='numeric' />

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
                <div className={styles.cards_wrapper}>
                    <div className={styles.stat_card}>
                        <span>Подписчиков {auth_store.user.followers?.length}</span>
                    </div>
                    <div className={styles.stat_card}>
                        <span>Подписок {auth_store.user.subscriptions?.length}</span>
                    </div>
                    <div className={styles.stat_card}>
                        <span>Списков {auth_store.user.lists?.length}</span>
                    </div>
                    {/* Вот тут идут иконки с цифрами */}
                    <div className={styles.stat_card_icons}>
                        <div className={styles.button_data_wrapper}>
                            <div className={styles.rocket_logo}></div>
                            <span>{auth_store.user.user_activity?.filter(function (el) { return el.activity_data.code === 200000 }).length}</span>
                        </div>
                        <div className={styles.button_data_wrapper}>
                            <div className={styles.finish_logo}></div>
                            <span>{auth_store.user.user_activity?.filter(function (el) { return el.activity_data.code === 220000 }).length}</span>

                        </div>
                        <div className={styles.button_data_wrapper}>
                            <div className={styles.heart_logo}></div>
                            <span>{auth_store.user.user_favorite?.length}</span>

                        </div>
                        <div className={styles.button_data_wrapper}>
                            <div className={styles.bag_logo}></div>
                            <span>{auth_store.user.user_activity?.filter(function (el) { return el.activity_data.code === 210000 }).length}</span>

                        </div>
                    </div>
                </div>
            </main>

        </>
    );
}


export default observer(SettingsMe)
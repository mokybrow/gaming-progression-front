import { observer } from "mobx-react-lite";

import styles from './sort.module.css'
import SortIcon from "@/components/icons/sort";
import { useContext, useRef, useState } from "react";
import { Context } from "@/app/providers";
import { ProfilePopup } from "@/components/popup/profile/ProfilePopup";
import useOutside from "@/hooks/useOutside";


function SortButton({...rest }) {
    const [isShow, setIsShow] = useState(false);
    const { games_store } = useContext(Context);
    const popupRef = useRef(null)

    useOutside(popupRef, () => {
        if (isShow) {
            setTimeout(() => setIsShow(false), 50)
        }

    })

    const SubmitSort = (name: string, type: string) => {
        games_store.setSort(name, type)
        games_store.filterGames(games_store.genres, games_store.platforms, null, games_store.release_date, 0, games_store.sort)
    }

    return (
        <>
            <div className={styles.sort_wrapper} onClick={() => setIsShow(!isShow)} >
                <div className={styles.sort_button_wrapper}{...rest } >

                    <div className={styles.icon_wrapper}>
                        <SortIcon className="general-icon" />
                    </div>
                    {games_store.sort.name == 'title' && games_store.sort.type == "asc" ? <><span>Сначала на А</span></>
                        : games_store.sort.name == 'title' && games_store.sort.type == "desc" ? <><span>Сначала на Я</span></>
                            : games_store.sort.name == 'release_date' && games_store.sort.type == "asc" ? <><span>Сначала старые</span></> :
                                <><span>Сначала новые</span></>}
                    {/* <span>Сортировка</span> */}
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
        </>
    )

}

export default observer(SortButton)
import { observer } from "mobx-react-lite";

import styles from './sort.module.css'
import SortIcon from "@/components/icons/sort";
import { useContext, useRef, useState } from "react";
import { Context } from "@/app/providers";
import { ProfilePopup } from "@/components/popup/profile/ProfilePopup";
import useOutside from "@/hooks/useOutside";
import DotsIcon from "@/components/icons/dots";
import ReportService from "@/services/reportService";
import ReactToast from "@/components/toast/Toast";


export interface ButtonProps {
    contentId: string,
    contentType: string,
    setToastText: any,
    setActive: any
}

function ReportButton({ contentId, contentType, setToastText, setActive }: ButtonProps) {
    const [isShow, setIsShow] = useState(false);
    const popupRef = useRef(null)

    useOutside(popupRef, () => {
        if (isShow) {
            setTimeout(() => setIsShow(false), 50)
        }

    })

    const sendReport = (type: string, contentId: string, contentType: string, description: string | null) => {

        ReportService.CreateNewReport(type, contentId, contentType, description).then(
            () => (setToastText('Ваша жалоба успешно отправленна'),
                setActive(true))
        ).catch(() => (
            setToastText('Вы уже жаловались на данную запись'),
            setActive(true)
        ))

    }

    return (
        <>
            <div className={styles.sort_wrapper} onClick={() => setIsShow(!isShow)} >
                <div className={styles.icon_wrapper}>
                    <DotsIcon className='general-icon-fill' />
                </div>
                {/* <span>Сортировка</span> */}
            </div>
        
            <ProfilePopup active={isShow} innerRef={popupRef}>
                <div className={styles.popup_elem} onClick={() => { sendReport('spam', contentId, contentType, null), setIsShow(!isShow) }}>Спам</div>
                <div className={styles.popup_elem} onClick={() => { sendReport('scum', contentId, contentType, null), setIsShow(!isShow) }}>Обман</div>
                <div className={styles.popup_elem} onClick={() => { sendReport('rape', contentId, contentType, null), setIsShow(!isShow) }}>Насилие и вражда</div>
                <div className={styles.popup_elem} onClick={() => { sendReport('antisocial', contentId, contentType, null), setIsShow(!isShow) }}>Запрещённое содержание</div>
                <div className={styles.popup_elem} onClick={() => { sendReport('adult', contentId, contentType, null), setIsShow(!isShow) }}>Откровенное изображение</div>
            </ProfilePopup>


        </>
    )

}

export default observer(ReportButton)
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
import ReportIcon from "@/components/icons/reportFlag";
import { CommandPopUp } from "@/components/popup/command_service/CommandPopUp";
import TrashIcon from "@/components/icons/trash";

import { FullScreenPopup } from "@/components/popup/main_popup/FullScreenPopup";
import ContentService from "@/services/contentService";
import SpamIcon from "@/components/icons/spam";
import ScamIcon from "@/components/icons/scam";
import ViolenceIcon from "@/components/icons/violence";
import BlockIcon from "@/components/icons/block";
import AdultIcon from "@/components/icons/adult";


export interface ButtonProps {
    contentId: string,
    contentType: string,
    setToastText: any,
    setActive: any,
    authorID: string
}

function CommandButton({ contentId, contentType, setToastText, setActive, authorID }: ButtonProps) {
    const [isShow, setIsShow] = useState(false);
    const popupRef = useRef(null)
    const { auth_store } = useContext(Context);
    const [isShowReport, setIsShowReport] = useState(false);
    const [isShowDelete, setIsShowDelete] = useState(false);
    const { content_store } = useContext(Context);

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
    const deletePost = async (postID: string) => {
        const result =  await content_store.deletePost(postID)
        if(result){
            (setToastText('Пост успешно удалён'),
            setActive(true))
        }
        else{
            (  setToastText('Пост не удалён'),
            setActive(true))
        }

    }
    return (
        <>
            <div className={styles.sort_wrapper} onClick={() => setIsShow(!isShow)} >
                <div className={styles.icon_wrapper}>
                    <DotsIcon className='general-icon-fill' />
                </div>
                {/* <span>Сортировка</span> */}
            </div>

            <CommandPopUp active={isShow} innerRef={popupRef}>

                <div className={styles.command_elem_wrapper} onClick={() => (setIsShowReport(true), setIsShow(!isShow))}>
                    <div className={styles.icon_wrapper}>
                        <ReportIcon className='general-icon' />
                    </div>
                    <div>Пожаловаться</div>
                </div>
                {auth_store.user.id === authorID ?
                    <div className={styles.del_elem_wrapper} onClick={() => (setIsShowDelete(true), setIsShow(!isShow))}>
                        <div className={styles.icon_wrapper}>
                            <TrashIcon className='trash-icon' />
                        </div>
                        <div>Удалить</div>
                    </div>
                    : null}


            </CommandPopUp>
            <FullScreenPopup active={isShowReport} setActive={setIsShowReport}>
                <div className={styles.popup_wrapper}>
                    <div className={styles.popup_elem} onClick={() => { sendReport('spam', contentId, contentType, null), setIsShowReport(false) }}>
                        <div className={styles.icon_wrapper_report}>
                            <SpamIcon className='general-icon-fill' />
                        </div>
                        <div>Спам</div>
                    </div>
                    <div className={styles.popup_elem} onClick={() => { sendReport('scum', contentId, contentType, null), setIsShowReport(false) }}>
                        <div className={styles.icon_wrapper_report}>
                            <ScamIcon className='general-icon-fill' />
                        </div>
                        <div>
                            Обман
                        </div>
                    </div>
                    <div className={styles.popup_elem} onClick={() => { sendReport('rape', contentId, contentType, null), setIsShowReport(false) }}>
                        <div className={styles.icon_wrapper_report}>
                            <ViolenceIcon className='general-icon' />
                        </div>
                        <div>
                            Насилие и вражда
                        </div>
                    </div>
                    <div className={styles.popup_elem} onClick={() => { sendReport('antisocial', contentId, contentType, null), setIsShowReport(false) }}>
                        <div className={styles.icon_wrapper_report}>
                            <BlockIcon className='general-icon' />
                        </div>
                        <div>
                            Запрещённое содержание
                        </div>
                    </div>
                    <div className={styles.popup_elem} onClick={() => { sendReport('adult', contentId, contentType, null), setIsShowReport(false) }}>
                        <div className={styles.icon_wrapper_report}>
                            <AdultIcon className='general-icon' />
                        </div>
                        <div>
                            Откровенное изображение
                        </div>
                    </div>
                </div>
            </FullScreenPopup>
            <FullScreenPopup active={isShowDelete} setActive={setIsShowDelete}>
                <div className={styles.popup_wrapper_delete}>
                    <span className={styles.alert_text}>Вы уверены что хотите удалить запись?</span>
                    <div className={styles.delete_wrapper}>
                        <div className={styles.command_elem_wrapper} onClick={() => setIsShowDelete(false)}>
                            Отмена
                        </div>

                        <div className={styles.del_elem_wrapper} onClick={() => (deletePost(contentId), setIsShowDelete(false))}>
                            <div className={styles.icon_wrapper}>
                                <TrashIcon className='trash-icon' />
                            </div>
                            <div>Удалить</div>
                        </div>

                    </div>
                </div>
            </FullScreenPopup>
        </>
    )

}

export default observer(CommandButton)
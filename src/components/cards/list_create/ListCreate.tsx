

import CrossIcon from '@/components/icons/cross'
import styles from './list.card.module.css'
import { useContext, useState } from 'react'

import InputField from '@/components/fields/input/InputField'
import { LoginButton } from '@/components/buttons/login/LoginButton';
import SettingsField from '@/components/fields/settings/SettingsField';
import { Context } from '@/app/providers';
import TextAreaField from '@/components/fields/textarea/TextArea';

export interface ModalProps {
    setIsShow: any,
    setToastText: any,
    setActive: any

}

function ListCreateCard({ setIsShow, setToastText, setActive }: ModalProps) {

    const [listName, setListName] = useState<string>('');
    const [listDescription, setListDescription] = useState<string>('');
    const [error, setError] = useState<string>('');

    const { content_store } = useContext(Context);


    function createPlaylist() {
        if (listName.trim() === '') {
            setError('Обязательно заполните название')
        }
        else if (listDescription.trim() == '') {

            content_store.createPlaylist(listName.trim(), null, false).then((response) => {
                if (!response) {
                    setError('У вас уже есть плейлист с похожим названием')
                }
                else {
                    setToastText('Список успешно создан')
                    setActive(true)
                    setListName('')
                    setListDescription('')
                    setError('')
                }
            })

        }
        else {
            content_store.createPlaylist(listName.trim(), listDescription, false).then((response) => {
                if (!response) {
                    setError('У вас уже есть плейлист с похожим названием')
                }
                else {
                    setToastText('Список успешно создан')
                    setActive(true)
                    setListName('')
                    setListDescription('')
                    setError('')
                }
            })

        }
    }

    return (
        <div className={styles.card_wrapper}>
            <div className={styles.card_header}>

                <div className={styles.exit_button} >
                    <div onClick={() => (setIsShow(false), setListName(''), setListDescription(''), setError(''))} className={styles.cross_icon}>
                        <CrossIcon className='general-icon' />
                    </div>
                </div>
            </div>

            <div className={styles.list_form}>
                <div className={styles.field_wrapper}>
                    <InputField
                        type={'text'} id={'text'} labelname={'Название списка'}
                        value={listName} onChange={(e) => (setListName(e.target.value), setError(''))} maxLength={50}/>
                    <div className={styles.char_count_wrapper}>
                        <div>
                            <small>{listName.length}/50</small>
                        </div>
                    </div>
                </div>
                <div className={styles.field_wrapper}>
                    <TextAreaField value={listDescription}
                        onChange={(e) => setListDescription(e.target.value)}
                        placeholder="Добавьте описание списка"
                        maxLength={100} />
                    <div className={styles.char_count_wrapper}>
                        <div>
                            <small>{listDescription.length}/100</small>
                        </div>
                    </div>
                </div>
                {error != '' ?
                    <div className={styles.error_block}>
                        <span>{error}</span>
                    </div>
                    : null
                }
                <LoginButton type={'button'} onClick={() => createPlaylist()}>
                    Создать
                </LoginButton>
            </div>

        </div>
    )
}

export default ListCreateCard
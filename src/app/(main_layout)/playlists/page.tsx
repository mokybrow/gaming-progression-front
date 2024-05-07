'use client'

import { Context } from "@/app/providers";
import PlaylistCard from "@/components/cards/playlists/PlaylistCard";
import { useContext, useEffect, useRef, useState } from "react"
import styles from './page.module.css'
import { observer } from "mobx-react-lite";
import ReactToast from "@/components/toast/Toast";
import ServiceButtonLong from "@/components/buttons/servicelong/ServiceButtonLong";
import CreateListIcon from "@/components/icons/createList";
import useOutside from "@/hooks/useOutside";
import { FullScreenPopup } from "@/components/popup/main_popup/FullScreenPopup";
import ListCreateCard from "@/components/cards/list_create/ListCreate";


function Playlists() {

    const { content_store } = useContext(Context);
    const { auth_store } = useContext(Context);

    const [page, setPage] = useState<number>(20)
    const [fetching, setFetching] = useState(false)
    const [active, setActive] = useState(false)
    const [toastText, setToastText] = useState<string>('')
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        if (content_store.myPlaylists.length < 20) {
            content_store.getPlaylists(0).then(resp => {
                content_store.setTotalPlaylistsCount(resp.headers['x-playlists-count'])
            })
        }
        if (auth_store.isAuth){
            content_store.getUserPlaylistsMe()
        }
    }, [content_store])

    useEffect(() => {

        if (fetching) {
            try {
                content_store.getPlaylistsScroll(page).then(resp => {
                    setPage(page + 20)
                    content_store.setTotalPlaylistsCount(resp.headers['x-playlists-count'])
                }).finally(() => setFetching(false))

            } catch (error) {

            }
        }


    }, [fetching])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }

    }, [])


    const scrollHandler = (e: any) => {
        if (e.target.documentElement.scrollHeight -
            (e.target.documentElement.scrollTop + window.innerHeight) < 100
            && content_store.pagePlaylists.length < content_store.totalPlaylistsCount
        ) {

            setFetching(true)
        }

    }

    const popupRef = useRef(null)
    useOutside(popupRef, () => {
        if (isShow) {
            setTimeout(() => setIsShow(false), 50)
        }

    })

    return (
        <>

            <main className="main_content_wrapper">
                <div className={styles.playlists_grid}>
                    {content_store.pagePlaylists.map(item => (
                        <div key={item.Playlists.id}>
                            <PlaylistCard id={item.Playlists.id}
                                owner_id={item.Playlists.owner_id}
                                name={item.Playlists.name}
                                about={item.Playlists.about}
                                owner_data={item.Playlists.owner_data}
                                list_games={item.Playlists.list_games}
                                addedPlaylist={item.addedPlaylist}
                                setActive={setActive}
                                setToastText={setToastText}
                            />
                        </div>
                    ))}
                </div>

            </main>
            <div className="right_side_wrapper">
                <ServiceButtonLong type={'button'} onClick={() => setIsShow(true)} >
                    <div className={styles.button_data_wrapper}>
                        <div className={styles.icon_wrapper}>
                            <CreateListIcon className='general-icon-fill' />
                        </div>
                        <div>
                            Создать список
                        </div>
                    </div>
                </ServiceButtonLong>

            </div>
            <ReactToast timeout={5000} active={active} setActive={setActive} toastText={toastText} setToastText={setToastText} />
            <FullScreenPopup active={isShow} setActive={setIsShow}>
                <ListCreateCard setIsShow={setIsShow} setToastText={setToastText} setActive={setActive} />
            </FullScreenPopup>
        </>

    );
}

export default observer(Playlists)
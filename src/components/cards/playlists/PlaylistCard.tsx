'use client'

import { Context } from "@/app/providers"
import { ListGame, OwnerData, Playlists } from "@/models/playlistsModels"
import { observer } from "mobx-react";
import { useContext } from "react"

import styles from './playlist.module.css'
import Link from "next/link";
import ServiceButtonLong from "@/components/buttons/servicelong/ServiceButtonLong";
import ListAddIcon from "@/components/icons/listAdd";
import ListRemoveIcon from "@/components/icons/listRemove";



export interface CardProps {
    id: string;
    owner_id: string;
    name: string;
    about: string | null;
    owner_data: OwnerData;
    list_games: ListGame[];
    addedPlaylist: number;
    setToastText: any;
    setActive: any;

}

function PlaylistCard({ id, owner_id, name, about, owner_data, list_games,
    addedPlaylist, setToastText, setActive }: CardProps) {
    const { auth_store } = useContext(Context);
    const { content_store } = useContext(Context);


    function AddPlaylistHandler(id: string) {
        if (!auth_store.isAuth) {
            setToastText('Авторизуйтесь, чтобы выполнить данное действие')
            setActive(true)
        }
        else if (owner_data.id === auth_store.user.id) {
            setToastText('Вы не можете удалить свой плейлист из коллекции')
            setActive(true)
        }
        else {

            content_store.addPlaylistToCollection(id)
        }
    }

    return (
        <div className={styles.card_wrapper}>
            <div className={styles.playlist_cover}>
                {list_games.slice(0, 3).map(item => (
                    <div className={styles.cover_wrapper} key={item.game_data.id}>
                        {item.game_data.cover !== null ?
                            <img src={item.game_data.cover} alt={item.game_data.title} className={styles.game_cover} />
                            : null}
                    </div>
                ))}
                <div className={styles.cover_wrapper}>
                    {list_games.length > 3 ?
                        <>
                            {
                                list_games[3].game_data.cover !== null ?
                                    <>
                                        <img src={list_games[3].game_data.cover}
                                            alt={list_games[3].game_data.title}
                                            className={styles.game_cover} />
                                    </> : null
                            }
                        </> : null}
                    <div className={styles.games_count}>
                        {list_games.length > 3 ? <>+{list_games.length - 3} </> : null}
                    </div>
                </div>
            </div>
            <Link href={`/playlists/${id}`} className={styles.playlist_info}>
                <div className={styles.other_information}>
                    <span>{name}</span>
                </div>
            </Link>
            <div className={styles.add_playlist_wrapper}>
                {addedPlaylist === 1 ?
                    <ServiceButtonLong type={'button'} onClick={() => AddPlaylistHandler(id)} >
                        <div className={styles.button_data_wrapper}>
                            <div className={styles.icon_wrapper}>
                                <ListRemoveIcon className='general-icon-fill' />
                            </div>
                            <div>
                                Удалить список из коллекции
                            </div>
                        </div>
                    </ServiceButtonLong>
                    :
                    <ServiceButtonLong type={'button'} onClick={() => AddPlaylistHandler(id)} disabled={owner_data.id === auth_store.user.id}>
                        <div className={styles.button_data_wrapper}>
                            <div className={styles.icon_wrapper}>
                                <ListAddIcon className='general-icon-fill' />
                            </div>
                            <div>
                                Добавить список в коллекцию
                            </div>
                        </div>
                    </ServiceButtonLong>}
            </div>
        </div>
    )

}

export default observer(PlaylistCard)
'use client'

import CrossIcon from '@/components/icons/cross'
import styles from './list.card.module.css'
import { useContext, useEffect, useState } from 'react'

import InputField from '@/components/fields/input/InputField'
import { LoginButton } from '@/components/buttons/login/LoginButton';
import SettingsField from '@/components/fields/settings/SettingsField';
import { Context } from '@/app/providers';
import CustomCheckbox from '@/components/fields/checkbox/CustomCheckbox';
import { GamePageResponse } from '@/models/gamesModel';
import PlaylistsService from '@/services/playlistsService';
import { observer } from 'mobx-react';

export interface ModalProps {
    setIsShow: any,
    setToastText: any,
    setActive: any,
    gamePage: GamePageResponse

}

function AddGameToList({ setIsShow, setToastText, setActive, gamePage }: ModalProps) {


    const { content_store } = useContext(Context);
    const { auth_store } = useContext(Context);


    function handleAddGameToList(listId: string, gameId: string) {
        PlaylistsService.addGameToPlaylist(listId, gameId).then(response => {
            if (response.status === 201) {
                content_store.myPlaylists.forEach(function (list) {
                    if (list.id === listId) {
                        list.list_games.push({
                            game_data: {
                                id: gamePage.id,
                                title: gamePage.title,
                                slug: gamePage.slug,
                                description: gamePage.description,
                                release_date: gamePage.release_date,
                                cover: gamePage.cover
                            }
                        })
                    }
                })
                content_store.pagePlaylists.forEach(function (list) {
                    if (list.Playlists.id === listId) {
                        list.Playlists.list_games.push({
                            game_data: {
                                id: gamePage.id,
                                title: gamePage.title,
                                slug: gamePage.slug,
                                description: gamePage.description,
                                release_date: gamePage.release_date,
                                cover: gamePage.cover
                            }
                        })
                    }
                })


            }
            else if (response.status === 200) {

                content_store.myPlaylists.forEach(function (list) {
                    const index = list.list_games.findIndex(n => n.game_data.id === gamePage.id && list.id === listId);
                    if (index !== -1) {
                        list.list_games.splice(index, 1);
                    }
                })

                content_store.pagePlaylists.forEach(function (list) {
                    const index = list.Playlists.list_games.findIndex(n => n.game_data.id === gamePage.id && list.Playlists.id === listId);
                    if (index !== -1) {
                        list.Playlists.list_games.splice(index, 1);
                    }
                })
       
            }
        })

    }

    return (
        <div className={styles.card_wrapper}>
            <div className={styles.card_header}>

                <div className={styles.exit_button} >
                    <div onClick={() => (setIsShow(false))} className={styles.cross_icon}>
                        <CrossIcon className='general-icon' />
                    </div>
                </div>
            </div>

            <div className={styles.list_form}>
                {content_store.myPlaylists.map(list => (

                    <div key={list.id}>
                        {list.owner_id === auth_store.user.id ?
                            < CustomCheckbox id={list.id} labelname={list.name}
                                onChange={() => handleAddGameToList(list.id, gamePage.id)}
                                checked={list.list_games.some(item => item.game_data.id === gamePage.id)} />
                            : null}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default observer(AddGameToList)
'use client'

import { Context } from "@/app/providers";
import { observer } from "mobx-react";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import styles from './page.module.css'
import GameCard from "@/components/cards/game_card/GameCard";
import { ListGame } from "@/models/playlistsModels";
import ServiceButtonLong from "@/components/buttons/servicelong/ServiceButtonLong";
import ListRemoveIcon from "@/components/icons/listRemove";
import ContentStore from "@/storage/contentStore";
import { formatDate } from "@/services/dateFormat";
import Link from "next/link";
import AuthStore from "@/storage/authStore";


const columnGenerator = (start: number, every: number, games: ListGame[], content_store: ContentStore, auth_store: AuthStore) => {
  let content = [];
  for (let i = start; i < games.length; i += every) {
    const game = games[i];
    content.push(
      <div key={game.game_data.id} className={styles.game_card_playlist}>

        <GameCard title={game.game_data.title} cover={game.game_data.cover}
          release_date={game.game_data.release_date} avg_rate={null}
          platforms={[]} genres={[]} slug={game.game_data.slug} />
        {auth_store.isAuth && content_store.playlistData.owner_id === auth_store.user.id ? 
          <ServiceButtonLong type={'button'} onClick={() => content_store.removeGameFormPlaylist(content_store.playlistData.id, game.game_data.id)} >
            <div className={styles.button_data_wrapper}>
              <div className={styles.icon_wrapper}>
                <ListRemoveIcon className='general-icon-fill' />
              </div>
              <div>
                Удалить игру из списка
              </div>
            </div>
          </ServiceButtonLong>
          : null}
      </div>

    );
  }
  return content;
};


function PlaylistPage() {

  const [page, setPage] = useState<number>(20)
  const [fetching, setFetching] = useState(false)
  const [active, setActive] = useState(false)
  const [toastText, setToastText] = useState<string>('')
  const [isShow, setIsShow] = useState(false);

  const pathname = usePathname()
  const listId = pathname.substring(pathname.lastIndexOf('/') + 1)


  const { content_store } = useContext(Context);
  const { auth_store } = useContext(Context);

  useEffect(() => {
    content_store.getPlaylistData(listId)

  }, [content_store])


  return (
    <>
      <main className="main_content_wrapper">

        {content_store.playlistData?.list_games?.length > 0 ?
          <>
            <div className={styles.cards_layout_three}>
              <div className={styles.column_layout} id="firs_column">
                {columnGenerator(0, 3, content_store.playlistData.list_games, content_store, auth_store)}
              </div>
              <div className={styles.column_layout} id="second_column">
                {columnGenerator(1, 3, content_store.playlistData.list_games, content_store, auth_store)}
              </div>
              <div className={styles.column_layout} id="third_column">
                {columnGenerator(2, 3, content_store.playlistData.list_games, content_store, auth_store)}
              </div>

            </div >
            <div className={styles.cards_layout_two}>
              <div className={styles.column_layout} id="second_column">
                {columnGenerator(0, 2, content_store.playlistData?.list_games, content_store, auth_store)}
              </div>
              <div className={styles.column_layout} id="third_column">
                {columnGenerator(1, 2, content_store.playlistData?.list_games, content_store, auth_store)}
              </div>
            </div >
            <div className={styles.cards_layout_one}>
              <div className={styles.column_layout} id="second_column">
                {columnGenerator(0, 1, content_store.playlistData?.list_games, content_store, auth_store)}
              </div>

            </div >
          </>
          : <><div>Игры не найдены</div></>}
      </main>
      <div className="right_side_wrapper">
        <div className={styles.playlist_data_wrapper}>
          <div className={styles.playlist_data_card_wrapper}>
            <div className={styles.block_header}> Название</div> <div>{content_store.playlistData.name}</div>
          </div>
          <div className={styles.playlist_data_card_wrapper}>
            <div className={styles.block_header}> Описание</div><div>{content_store.playlistData.about}</div>
          </div>
          <div className={styles.playlist_data_card_wrapper}>
            <div className={styles.block_header}>Создал </div><Link href={"/" + content_store.playlistData.owner_data?.username}><div>{content_store.playlistData.owner_data?.username}</div></Link>
          </div>
          <div className={styles.playlist_data_card_wrapper}>
            <div className={styles.block_header}>Дата создания </div> <div>{formatDate(content_store.playlistData.created_at)}</div>
          </div>
          <div className={styles.playlist_data_card_wrapper}>
            <div className={styles.block_header}>Всего игр </div> <div>{content_store.playlistData.list_games?.length}</div>
          </div>
        </div>
      </div >
    </>
  );
}

export default observer(PlaylistPage)
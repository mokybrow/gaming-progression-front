'use client'

import { Genre, Platform } from '@/models/gamesModel';
import styles from './game.card.module.css'
import Link from 'next/link';
import { formatDate } from '@/services/dateFormat';
import { observer } from 'mobx-react';


export interface CardProps {
    title: string,
    cover: string | null,
    release_date: string | null,
    avg_rate: number | null,
    platforms: Platform[],
    genres: Genre[],
    slug: string,
}

function GameCard({ title, cover, release_date, avg_rate, platforms, genres, slug }: CardProps) {

    return (

        <div className={styles.item}>

            <figure className={styles.figure}>
                {cover ?
                    <img src={cover} alt="A windmill" className={styles.img} />
                    :
                    null
                }
            </figure>
            <figcaption className={styles.figcaption}>
                <Link href={`/games/${slug}`}>{title}</Link>
            </figcaption>
            <Link href={`/games/${slug}`} className={styles.game_info}>
                <div className={styles.other_information}>
                    <div className={styles.description}>
                        <span className={styles.nowrap_header}>Год:&nbsp;</span>
                        <span>

                            {release_date ?
                                <span>

                                    {formatDate(release_date)}
                                </span>
                                : <>N/A</>}
                        </span>
                    </div>
                    <hr />

                    <div className={styles.description}>
                        <span className={styles.nowrap_header}>Платформы:&nbsp;</span>
                        <div className={styles.left_text} key={title}>
                            {platforms.length ?
                                <>
                                    {platforms.map((platform, index) =>
                                        <span key={platform.platform.id}>
                                            {platform.platform.platform_name + ((platforms.length > 0 && index !== platforms.length - 1) ? ', ' : '')}
                                        </span>
                                    )}
                                </>
                                : <>N/A</>}
                        </div>

                    </div>
                    <hr />
                    <div className={styles.description}>
                        <span className={styles.nowrap_header}>Жанр:&nbsp;</span>
                        <div className={styles.left_text}>
                            {genres.length ?
                                <>
                                    {genres.map((genre, index) =>
                                        <span key={genre.genre.id}>
                                            {genre.genre.name_ru + ((genres.length > 0 && index !== genres.length - 1) ? ', ' : '')}
                                        </span>
                                    )}
                                </>
                                : <>N/A</>}
                        </div>
                    </div>

                </div>
            </Link>
        </div>

    )

}

export default observer(GameCard)
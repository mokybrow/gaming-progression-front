'use client'

import { Genre, Platform } from '@/models/gamesModel';
import styles from './game.card.module.css'
import Link from 'next/link';
import { formatDate } from '@/services/dateFormat';


export interface CardProps {
    title: string,
    cover: string,
    release_date: Date | null,
    avg_rate: number | null,
    platforms: Platform[],
    genres: Genre[],
    slug: string,
}

export default function GameCard({ title, cover, release_date, avg_rate, platforms, genres, slug }: CardProps) {

    return (

        <div className={styles.item}>
            <div className={styles.content} >
                <div className={styles.cover_wrapper}>
                    <img src={cover} alt={title} className={styles.game_cover} />
                </div>
                <div className={styles.flex}>
                    <Link href={`/games/${slug}`}>
                        <span className={styles.game_title}>{title}</span>
                    </Link>
                </div>
            </div>

            <div className={styles.hidden}>
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
                            {platforms.map((platform, index) =>

                                <span key={platform.platform.id}>
                                    {platform.platform.platform_name + ((platforms.length > 0 && index !== platforms.length - 1) ? ', ' : '')}
                                </span>
                            )}
                        </div>

                    </div>
                    <hr />
                    <div className={styles.description}>
                        <span className={styles.nowrap_header}>Жанр:&nbsp;</span>
                        <div className={styles.left_text}>
                            {genres.map((genre, index) =>
                                <span key={genre.genre.id}>
                                    {genre.genre.name + ((genres.length > 0 && index !== genres.length - 1) ? ', ' : '')}
                                </span>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>



    )

}

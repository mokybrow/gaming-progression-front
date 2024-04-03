'use client'

import { Genre, Platform } from '@/models/gamesModel';
import styles from './card.module.css'
import Link from 'next/link';
import { FormattedMessage, FormattedDate } from 'react-intl';
import Image from 'next/image'


export interface CardProps {
    title: string,
    cover: string,
    release_date: string,
    slug: string,
    description: string | null,
    activity_type: string,
}

export default function ActivityCard({ title, cover, release_date, description, slug, activity_type }: CardProps) {
    return (
        <div className={styles.card_wrapper}>
            <div className={styles.title_wrapper}>
                {activity_type === 'wish' ?
                    <span>Хочет пройти - <Link href={`games/${slug}`}>{title}</Link></span>
                    : null}
                {activity_type === 'complete' ?
                    <span>Прошёл(а) - <Link href={`games/${slug}`}>{title}</Link></span>
                    : null}
                {activity_type === 'start' ?
                    <span>Начал(а) - <Link href={`games/${slug}`}>{title}</Link></span>
                    : null}

            </div>
            <div className={styles.cover_wrapper}>
                <img src={cover} alt={''} />
            </div>
        </div>)

}
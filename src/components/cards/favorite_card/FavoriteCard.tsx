'use client'

import { Genre, Platform } from '@/models/gamesModel';
import styles from './card.module.css'
import Link from 'next/link';
import Image from 'next/image'


export interface CardProps {
    title: string,
    cover: string,
    release_date: string,
    slug: string,
    description: string | null,
}

export default function FavoriteCard({ title, cover, release_date, description, slug }: CardProps) {
    return (
        <div className={styles.card_wrapper}>
            <div className={styles.title_wrapper}>
                <span>Понравилась - <Link href={`games/${slug}`}>{title}</Link></span>
            </div>
            <div className={styles.cover_wrapper}>
                <img src={cover} alt={''} />
            </div>
        </div>)

}
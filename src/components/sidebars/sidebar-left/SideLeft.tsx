'use client'

import Link from "next/link";
import styles from './side.left.module.css'
import { usePathname} from 'next/navigation';

const SideLeft = () => {
    const pathname = usePathname()

    const isActive = (href: string) =>  pathname === href

    return (
        <div className={styles.sidebar_left}>
            <div className={styles.sidebar}>
                <div className={styles.sidebar_top}>
                    
                    <Link href={"/games"} className={isActive('/games') ? "active" : ""}><div className={styles.gamepad_icon}></div> <span>Все игры</span> </Link>
                    <Link href={"/calendar"} className={isActive('/calendar') ? "active" : ""}><div className={styles.calendar_icon}></div> <span>Календарь игр</span></Link>
                    <Link href={"/goty"} className={isActive('/goty') ? "active" : ""}><div className={styles.cup_icon}></div> <span>Игры года</span></Link>
                    <Link href={"/feed"} className={isActive('/feed') ? "active" : ""}><div className={styles.feed_icon}></div> <span>Лента новостей</span></Link>
                    <Link href={"/playlists"} className={isActive('/playlists') ? "active" : ""}><div className={styles.playlist_icon}></div> <span>Плейлисты</span></Link>
                </div>
                <div className={styles.sidebar_bottom}>
                    <Link href={"/about-us"}>О нас</Link>
                    <Link href={"/terms"}>Правила</Link>
                    <Link href={"/help"}>Помощь</Link>
                    <Link href={"/site-map"}>Карта сайта</Link>
                </div>
            </div>
        </div>
    );
}

export default SideLeft;
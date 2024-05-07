"use client"

import Image from "next/image"
import styles from './menu.module.css'
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useRef, useState } from "react";
import useOutside from "@/hooks/useOutside";
import { MenuPopup } from "../popup/menu/MenuPopUp";
import CircleLoader from "../loader/circle";
import GamepadIcon from "../icons/gamepad";
import CalendarIcon from "../icons/calendar";
import PlaylistIcon from "../icons/playlist";
import FeedIcon from "../icons/feed";
import CupIcon from "../icons/cup";
import HomeIcon from "../icons/home";
import SearchIcon from "../icons/search";
import UserIcon from "../icons/user";
import MenuIcon from "../icons/menu";


const BottomMenu = () => {

    const currentRoute = usePathname();
    const [isShow, setIsShow] = useState(false);
    const pathname = usePathname()

    const isActive = (href: string) => pathname === href

    const popupRef = useRef(null)
    useOutside(popupRef, () => {
        if (isShow) {
            setTimeout(() => setIsShow(false), 50)
        }

    })
    return (
        <>
            <MenuPopup active={isShow} innerRef={popupRef} setIsShow={setIsShow}>
                <Link href={"/games"} className={isActive('/games') ? "active" : ""} onClick={() => setIsShow(false)}><div className={styles.gamepad_icon}><GamepadIcon className='general-icon' /></div> <span>Все игры</span> </Link>
                <Link href={"/calendar"} className={isActive('/calendar') ? "active" : ""} onClick={() => setIsShow(false)}><div className={styles.calendar_icon}><CalendarIcon className='general-icon-fill' /></div> <span>Календарь игр</span></Link>
                <Link href={"/goty"} className={isActive('/goty') ? "active" : ""} onClick={() => setIsShow(false)}><div className={styles.cup_icon}> <CupIcon className='general-icon' /></div> <span>Игры года</span></Link>
                <Link href={"/feed"} className={isActive('/feed') ? "active" : ""} onClick={() => setIsShow(false)}><div className={styles.feed_icon}><FeedIcon className='general-icon' /></div> <span>Лента новостей</span></Link>
                <Link href={"/playlists"} className={isActive('/playlists') ? "active" : ""} onClick={() => setIsShow(false)}><div className={styles.playlist_icon}><PlaylistIcon className='general-icon' /></div> <span>Плейлисты</span></Link>
            </MenuPopup>

            <div className={styles.menu}>
                <div className={styles.menulimit}>

                    <div className={styles.menu_logo} onClick={() => setIsShow(true)}>
                        <MenuIcon className='general-icon' />
                    </div>

                    <Link href={"/"} className={currentRoute === "/"
                        ? styles.pointermenu
                        : "notpointer"}>
                        <div className={styles.home_logo}>
                            <HomeIcon className="general-icon-fill" />
                        </div>

                    </Link>
                    <Link href={"/search"} className={currentRoute === "/search"
                        ? styles.pointermenu
                        : "notpointer"}>
                        <div className={styles.search_logo}>
                            <SearchIcon className='general-icon' />
                        </div>
                    </Link>
                    <Link href={"/account"} className={currentRoute === "/account"
                        ? styles.pointermenu
                        : "notpointer"}>
                        <div className={styles.user_logo}>
                            <UserIcon className='general-icon' />
                        </div>
                    </Link>

                </div>
            </div>
        </>
    )
}

export default BottomMenu
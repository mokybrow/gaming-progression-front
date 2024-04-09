"use client"

import Image from "next/image"
import styles from './menu.module.css'
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useRef, useState } from "react";
import useOutside from "@/hooks/useOutside";
import { MenuPopup } from "../popup/menu/MenuPopUp";
import CircleLoader from "../loader/circle";


const BottomMenu = () => {

    const currentRoute = usePathname();
    const [isShow, setIsShow] = useState(false);
    const pathname = usePathname()

    const isActive = (href: string) =>  pathname === href

    const popupRef = useRef(null)
    useOutside(popupRef, () => {
        if (isShow) {
            setTimeout(() => setIsShow(false), 50)
        }

    })
    return (
        <>
            <MenuPopup active={isShow} innerRef={popupRef} setIsShow={setIsShow}>
                <div className={styles.popup_menu_items}>
                    <Link href={"/games"} className={isActive('/games') ? styles.actve : ""} onClick={() => setIsShow(false)}><div className={styles.gamepad_icon}></div> <span>Все игры</span> </Link>
                    <Link href={"/calendar"} className={isActive('/calendar') ? styles.actve : ""} onClick={() => setIsShow(false)}><div className={styles.calendar_icon}></div> <span>Календарь игр</span></Link>
                    <Link href={"/goty"} className={isActive('/goty') ? styles.actve : ""} onClick={() => setIsShow(false)}><div className={styles.cup_icon}></div> <span>Игры года</span></Link>
                    <Link href={"/feed"} className={isActive('/feed') ? styles.actve : ""} onClick={() => setIsShow(false)}><div className={styles.feed_icon}></div> <span>Лента новостей</span></Link>
                    <Link href={"/playlists"} className={isActive('/playlists') ? styles.actve: ""} onClick={() => setIsShow(false)}><div className={styles.playlist_icon}></div> <span>Плейлисты</span></Link>
                </div>

            </MenuPopup>

            <div className={styles.menu}>
                <div className={styles.menulimit}>

                    <div className={styles.menu_logo} onClick={() => setIsShow(true)}>
                    </div>

                    <Link href={"/"} className={currentRoute === "/"
                        ? styles.pointermenu
                        : "notpointer"}>
                        <div className={styles.home_logo}>
                        </div>

                    </Link>
                    <Link href={"/search"} className={currentRoute === "/search"
                        ? styles.pointermenu
                        : "notpointer"}>
                        <div className={styles.search_logo}>
                        </div>
                    </Link>
                    <Link href={"/account"} className={currentRoute === "/account"
                        ? styles.pointermenu
                        : "notpointer"}>
                        <div className={styles.user_logo}>
                        </div>
                    </Link>

                </div>
            </div>
        </>
    )
}

export default BottomMenu
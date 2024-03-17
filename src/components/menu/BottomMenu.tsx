"use client"

import Image from "next/image"
import styles from './menu.module.css'
import Link from "next/link";
import { usePathname } from "next/navigation";
import menu from '@/assets/icons/general/menu.png'
import home from '@/assets/icons/general/home.png'
import searchico from '@/assets/icons/general/searchico.png'
import user from '@/assets/icons/general/user.png'


const BottomMenu = () => {

    const currentRoute = usePathname();

    return (
        <div className={styles.menu}>
            <div className={styles.menulimit}>
                <div className={styles.menu_logo}>
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

    )
}

export default BottomMenu
'use client'

import styles from './filters.module.css'

import { useContext, useEffect, useState } from 'react';
import { Context } from '@/app/providers';
import { observer } from 'mobx-react-lite';
import ServiceButtonLong from '@/components/buttons/servicelong/ServiceButtonLong';
import CustomCheckbox from '@/components/fields/checkbox/CustomCheckbox';
import CrossIcon from '@/components/icons/cross';



export interface ModalProps {
    setIsShow: any
}


function FiltersCard({ setIsShow }: ModalProps) {
    const { games_store } = useContext(Context);


    const platforms = [
        { id: 'android', label: 'Android', checked: games_store.platforms.some(o => o == "android") },
        { id: "atari-2600", label: "Atari 2600", checked: games_store.platforms.some(o => o == "atari-2600") },
        { id: "game-boy-advance", label: "Game Boy Advance", checked: games_store.platforms.some(o => o == "game-boy-advance") },
        { id: "macos", label: "macOS", checked: games_store.platforms.some(o => o == "macos") },
        { id: "ios", label: "iOS", checked: games_store.platforms.some(o => o == "ios") },
        { id: "linux", label: "Linux", checked: games_store.platforms.some(o => o == "linux") },
        { id: "nintendo-64", label: "Nintendo 64", checked: games_store.platforms.some(o => o == "nintendo-64") },
        { id: "nintendo-ds", label: "Nintendo DS", checked: games_store.platforms.some(o => o == "nintendo-ds") },
        { id: "nintendo-switch", label: "Nintendo Switch", checked: games_store.platforms.some(o => o == "nintendo-switch") },
        { id: "pc", label: "PC", checked: games_store.platforms.some(o => o == "pc") },
        { id: "playstation1", label: "Playstation", checked: games_store.platforms.some(o => o == "playstation1") },
        { id: "playstation2", label: "Playstation 2", checked: games_store.platforms.some(o => o == "playstation2") },
        { id: "playstation3", label: "Playstation 3", checked: games_store.platforms.some(o => o == "playstation3") },
        { id: "playstation4", label: "Playstation 4", checked: games_store.platforms.some(o => o == "playstation4") },
        { id: "playstation5", label: "Playstation 5", checked: games_store.platforms.some(o => o == "playstation5") },
        { id: "ps-vita", label: "PS Vita", checked: games_store.platforms.some(o => o == "ps-vita") },
        { id: "psp", label: "PSP", checked: games_store.platforms.some(o => o == "psp") },
        { id: "sega-cd", label: "Sega Mega-CD", checked: games_store.platforms.some(o => o == "sega-cd") },
        { id: "sega-master-system", label: "Sega Master System", checked: games_store.platforms.some(o => o == "sega-master-system") },
        { id: "sega-saturn", label: "Sega Saturn", checked: games_store.platforms.some(o => o == "sega-saturn") },
        { id: "web", label: "Web", checked: games_store.platforms.some(o => o == "web") },
        { id: "wii", label: "Wii", checked: games_store.platforms.some(o => o == "wii") },
        { id: "wii-u", label: "Wii U", checked: games_store.platforms.some(o => o == "wii-u") },
        { id: "xbox-old", label: "Xbox Original", checked: games_store.platforms.some(o => o == "xbox-old") },
        { id: "xbox-one", label: "Xbox One", checked: games_store.platforms.some(o => o == "xbox-one") },
        { id: "xbox-series-x", label: "Xbox Series X", checked: games_store.platforms.some(o => o == "xbox-series-x") },
        { id: "xbox360", label: "Xbox One", checked: games_store.platforms.some(o => o == "xbox360") },
        { id: "xbox-one", label: "Xbox 360", checked: games_store.platforms.some(o => o == "xbox-one") },
    ];
    const genres = [
        { id: 'Action', label: 'Экшн', checked: games_store.genres.some(o => o == "Action") },
        { id: "Adventure", label: "Приключение", checked: games_store.genres.some(o => o == "Adventure") },
        { id: "RPG", label: "Ролевая", checked: games_store.genres.some(o => o == "RPG") },
        { id: "Shooter", label: "Шутер", checked: games_store.genres.some(o => o == "Shooter") },
        { id: "Puzzle", label: "Головоломка", checked: games_store.genres.some(o => o == "Puzzle") },
        { id: "Massively Multiplayer", label: "Многопольз.", checked: games_store.genres.some(o => o == "Massively Multiplayer") },
        { id: "Simulation", label: "Симулятор", checked: games_store.genres.some(o => o == "Simulation") },
        { id: "Indie", label: "Инди", checked: games_store.genres.some(o => o == "Indie") },
        { id: "Platformer", label: "Платформер", checked: games_store.genres.some(o => o == "Platformer") },
        { id: "Sports", label: "Спортивная", checked: games_store.genres.some(o => o == "Sports") },
        { id: "Racing", label: "Гонка", checked: games_store.genres.some(o => o == "Racing") },
        { id: "Arcade", label: "Аркада", checked: games_store.genres.some(o => o == "Arcade") },
        { id: "Casual", label: "Казуальная", checked: games_store.genres.some(o => o == "Casual") },
        { id: "Fighting", label: "Драки", checked: games_store.genres.some(o => o == "Fighting") },
        { id: "Strategy", label: "Стратегия", checked: games_store.genres.some(o => o == "Strategy") },
        { id: "Family", label: "Семейная", checked: games_store.genres.some(o => o == "Family") },
        { id: "Educational", label: "Образовательная", checked: games_store.genres.some(o => o == "Educational") },
        { id: "Board Games", label: "Настольная", checked: games_store.genres.some(o => o == "Board Games") },
        { id: "Card", label: "Карточная", checked: games_store.genres.some(o => o == "Card") },

    ];
    const years = [
        { id: 2024, label: 2024, checked: games_store.release_date.some(o => o == 2024) },
        { id: 2023, label: 2023, checked: games_store.release_date.some(o => o == 2023) },
        { id: 2022, label: 2022, checked: games_store.release_date.some(o => o == 2022) },
        { id: 2021, label: 2021, checked: games_store.release_date.some(o => o == 2021) },
        { id: 2020, label: 2020, checked: games_store.release_date.some(o => o == 2020) },
        { id: 2019, label: 2019, checked: games_store.release_date.some(o => o == 2019) },
        { id: 2018, label: 2018, checked: games_store.release_date.some(o => o == 2018) },
        { id: 2017, label: 2017, checked: games_store.release_date.some(o => o == 2017) },
        { id: 2016, label: 2016, checked: games_store.release_date.some(o => o == 2016) },
        { id: 2015, label: 2015, checked: games_store.release_date.some(o => o == 2015) },
        { id: 2014, label: 2014, checked: games_store.release_date.some(o => o == 2014) },
        { id: 2013, label: 2013, checked: games_store.release_date.some(o => o == 2013) },
        { id: 2012, label: 2012, checked: games_store.release_date.some(o => o == 2012) },
        { id: 2011, label: 2011, checked: games_store.release_date.some(o => o == 2011) },
        { id: 2010, label: 2010, checked: games_store.release_date.some(o => o == 2010) },
        { id: 2009, label: 2009, checked: games_store.release_date.some(o => o == 2009) },
        { id: 2008, label: 2008, checked: games_store.release_date.some(o => o == 2008) },
        { id: 2007, label: 2007, checked: games_store.release_date.some(o => o == 2007) },
        { id: 2006, label: 2006, checked: games_store.release_date.some(o => o == 2006) },
        { id: 2005, label: 2005, checked: games_store.release_date.some(o => o == 2005) },
        { id: 2004, label: 2004, checked: games_store.release_date.some(o => o == 2004) },
        { id: 2003, label: 2003, checked: games_store.release_date.some(o => o == 2003) },
        { id: 2002, label: 2002, checked: games_store.release_date.some(o => o == 2002) },
        { id: 2001, label: 2001, checked: games_store.release_date.some(o => o == 2001) },
        { id: 2000, label: 2000, checked: games_store.release_date.some(o => o == 2000) },
        { id: 1999, label: 1999, checked: games_store.release_date.some(o => o == 1999) },
        { id: 1998, label: 1998, checked: games_store.release_date.some(o => o == 1998) },
        { id: 1997, label: 1997, checked: games_store.release_date.some(o => o == 1997) },
        { id: 1996, label: 1996, checked: games_store.release_date.some(o => o == 1996) },
        { id: 1995, label: 1995, checked: games_store.release_date.some(o => o == 1995) },
        { id: 1994, label: 1994, checked: games_store.release_date.some(o => o == 1994) },
        { id: 1993, label: 1993, checked: games_store.release_date.some(o => o == 1993) },
        { id: 1992, label: 1992, checked: games_store.release_date.some(o => o == 1992) },
        { id: 1991, label: 1991, checked: games_store.release_date.some(o => o == 1991) },
        { id: 1990, label: 1990, checked: games_store.release_date.some(o => o == 1990) },
        { id: 1989, label: 1989, checked: games_store.release_date.some(o => o == 1989) },
        { id: 1988, label: 1988, checked: games_store.release_date.some(o => o == 1988) },
        { id: 1987, label: 1987, checked: games_store.release_date.some(o => o == 1987) },
        { id: 1986, label: 1986, checked: games_store.release_date.some(o => o == 1986) },
        { id: 1985, label: 1985, checked: games_store.release_date.some(o => o == 1985) },
        { id: 1984, label: 1984, checked: games_store.release_date.some(o => o == 1984) },
        { id: 1983, label: 1983, checked: games_store.release_date.some(o => o == 1983) },
        { id: 1982, label: 1982, checked: games_store.release_date.some(o => o == 1982) },
        { id: 1981, label: 1981, checked: games_store.release_date.some(o => o == 1981) },
        { id: 1980, label: 1980, checked: games_store.release_date.some(o => o == 1980) },
        { id: 1979, label: 1979, checked: games_store.release_date.some(o => o == 1979) },
        { id: 1978, label: 1978, checked: games_store.release_date.some(o => o == 1978) },
        { id: 1977, label: 1977, checked: games_store.release_date.some(o => o == 1977) },
        { id: 1976, label: 1976, checked: games_store.release_date.some(o => o == 1976) },
        { id: 1975, label: 1975, checked: games_store.release_date.some(o => o == 1975) },
        { id: 1974, label: 1974, checked: games_store.release_date.some(o => o == 1974) },
        { id: 1973, label: 1973, checked: games_store.release_date.some(o => o == 1973) },
        { id: 1972, label: 1972, checked: games_store.release_date.some(o => o == 1972) },
        { id: 1971, label: 1971, checked: games_store.release_date.some(o => o == 1971) },
        { id: 1970, label: 1970, checked: games_store.release_date.some(o => o == 1970) },
        { id: 1969, label: 1969, checked: games_store.release_date.some(o => o == 1969) },
        { id: 1968, label: 1968, checked: games_store.release_date.some(o => o == 1968) },
        { id: 1967, label: 1967, checked: games_store.release_date.some(o => o == 1967) },
        { id: 1966, label: 1966, checked: games_store.release_date.some(o => o == 1966) },
        { id: 1965, label: 1965, checked: games_store.release_date.some(o => o == 1965) },
        { id: 1964, label: 1964, checked: games_store.release_date.some(o => o == 1964) },
        { id: 1963, label: 1963, checked: games_store.release_date.some(o => o == 1963) },
        { id: 1962, label: 1962, checked: games_store.release_date.some(o => o == 1962) },
        { id: 1961, label: 1961, checked: games_store.release_date.some(o => o == 1961) },
        { id: 1960, label: 1960, checked: games_store.release_date.some(o => o == 1960) },
        { id: 1959, label: 1959, checked: games_store.release_date.some(o => o == 1959) },
        { id: 1958, label: 1958, checked: games_store.release_date.some(o => o == 1958) },
        { id: 1957, label: 1957, checked: games_store.release_date.some(o => o == 1957) },
        { id: 1956, label: 1956, checked: games_store.release_date.some(o => o == 1956) },
        { id: 1955, label: 1955, checked: games_store.release_date.some(o => o == 1955) },
        { id: 1954, label: 1954, checked: games_store.release_date.some(o => o == 1954) },]



    const handleGenresChange = (key: any) => {

        if (!games_store.genres.find((i) => i === key)) {
            games_store.setGenre([...games_store.genres, key])
        }
        else {
            let index = games_store.genres.indexOf(key);

            if (index !== -1) {
                games_store.genres.splice(index, 1);
            }
        }

    }
    const handlePlatformsChange = (key: any) => {


        if (!games_store.platforms.find((i) => i === key)) {

            games_store.setPlatform([...games_store.platforms, key])
        }
        else {
            let index = games_store.platforms.indexOf(key);
            if (index !== -1) {
                games_store.platforms.splice(index, 1)

            }
        }
    }
    const handleYearChange = (key: any) => {
        if (!games_store.release_date.find((i) => i === key)) {

            games_store.setRelease([...games_store.release_date, key])
        }
        else {
            let index = games_store.release_date.indexOf(key);
            if (index !== -1) {
                games_store.release_date.splice(index, 1)

            }
        }

    }
    const SubmitFilter = () => {
        games_store.filterGames(games_store.genres, games_store.platforms, null, games_store.release_date, 0, games_store.sort)
    }

    const ClearFilter = () => {
        games_store.setGenre([])
        games_store.setPlatform([])
        games_store.setRelease([])
        games_store.filterGames([], [], null, [], 0, games_store.sort)

    }
    return (

        <div className={styles.filters_wrapper} >

            <form action="">
                <div className={styles.card_header}>

                    <div className={styles.exit_button} >
                        <div onClick={() => (setIsShow(false))} className={styles.cross_icon}>
                            <CrossIcon className='general-icon' />
                        </div>
                    </div>
                </div>
                <h4>
                    Жанр
                </h4>
                <div className={styles.block_wrapper}>
                    <div className={styles.choose_section}>
                        {genres.map(item => (
                            <div key={item.id} className={styles.item_wrapper}>
                                <CustomCheckbox id={item.id} checked={item.checked} onClick={() => handleGenresChange(item.id)} labelname={item.label} />
                            </div>
                        ))}
                    </div>

                </div>
                <h4>
                    Платформа
                </h4>
                <div className={styles.block_wrapper}>
                    <div className={styles.choose_section}>
                        {platforms.map(item => (
                            <div key={item.id} className={styles.item_wrapper}>
                                <CustomCheckbox id={item.id} checked={item.checked} onClick={() => handlePlatformsChange(item.id)} labelname={item.label} />
                            </div>
                        ))}
                    </div>
                </div>

                <h4>
                    Год
                </h4>
                <div className={styles.block_wrapper}>
                    <div className={styles.choose_section}>

                        {years.map(item => (
                            <div key={item.id} className={styles.item_wrapper}>
                                <CustomCheckbox id={String(item.id)} checked={item.checked} onClick={() => handleYearChange(item.id)} labelname={String(item.label)} />
                            </div>
                        ))}
                    </div>
                </div>
                <ServiceButtonLong type={'button'} onClick={() => (SubmitFilter(), setIsShow(false))}>Применить фильтры</ServiceButtonLong>
                <ServiceButtonLong type={'reset'} onClick={() => (ClearFilter(), setIsShow(false))}>Сбросить фильтры</ServiceButtonLong>
            </form>
        </div>

    )

}

export default observer(FiltersCard)
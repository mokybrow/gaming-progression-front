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
        { id: 310010, label: 'Android', checked: games_store.platforms.some(o => o == 310010) },
        { id: 310032, label: "Atari 2600", checked: games_store.platforms.some(o => o == 310032) },
        { id: 310026, label: "Game Boy Advance", checked: games_store.platforms.some(o => o == 310026) },
        { id: 310007, label: "macOS", checked: games_store.platforms.some(o => o == 310007) },
        { id: 310012, label: "iOS", checked: games_store.platforms.some(o => o == 310012) },
        { id: 310009, label: "Linux", checked: games_store.platforms.some(o => o == 310009) },
        { id: 310023, label: "Nintendo 64", checked: games_store.platforms.some(o => o == 310023) },
        { id: 310020, label: "Nintendo DS", checked: games_store.platforms.some(o => o == 310020) },
        { id: 310016, label: "Nintendo 3DS", checked: games_store.platforms.some(o => o == 310016) },
        { id: 310008, label: "Nintendo Switch", checked: games_store.platforms.some(o => o == 310008) },
        { id: 310002, label: "PC", checked: games_store.platforms.some(o => o == 310002) },
        { id: 310024, label: "Playstation", checked: games_store.platforms.some(o => o == 310024) },
        { id: 310017, label: "Playstation 2", checked: games_store.platforms.some(o => o == 310017) },
        { id: 310004, label: "Playstation 3", checked: games_store.platforms.some(o => o == 310004) },
        { id: 310003, label: "Playstation 4", checked: games_store.platforms.some(o => o == 310003) },
        { id: 310000, label: "Playstation 5", checked: games_store.platforms.some(o => o == 310000) },
        { id: 310011, label: "PS Vita", checked: games_store.platforms.some(o => o == 310011) },
        { id: 310025, label: "PSP", checked: games_store.platforms.some(o => o == 310025) },
        { id: 310048, label: "Sega Mega-CD", checked: games_store.platforms.some(o => o == 310048) },
        { id: 310043, label: "Sega Master System", checked: games_store.platforms.some(o => o == 310043) },
        { id: 310029, label: "Sega Saturn", checked: games_store.platforms.some(o => o == 310029) },
        { id: 310014, label: "Web", checked: games_store.platforms.some(o => o == 310014) },
        { id: 310021, label: "Wii", checked: games_store.platforms.some(o => o == 310021) },
        { id: 310015, label: "Wii U", checked: games_store.platforms.some(o => o == 310015) },
        { id: 310013, label: "Xbox Original", checked: games_store.platforms.some(o => o == 310013) },
        { id: 310005, label: "Xbox 360", checked: games_store.platforms.some(o => o == 310005) },
        { id: 310006, label: "Xbox One", checked: games_store.platforms.some(o => o == 310006) },
        { id: 310001, label: "Xbox Series X", checked: games_store.platforms.some(o => o == 310001) },
    ];
    const genres = [
        { id: 300001, label: 'Экшн', checked: games_store.genres.some(o => o == 300001) },
        { id: 300002, label: "Приключение", checked: games_store.genres.some(o => o == 300002) },
        { id: 300003, label: "Ролевая", checked: games_store.genres.some(o => o == 300003) },
        { id: 300004, label: "Шутер", checked: games_store.genres.some(o => o == 300004) },
        { id: 300005, label: "Головоломка", checked: games_store.genres.some(o => o == 300005) },
        { id: 300006, label: "Многопольз.", checked: games_store.genres.some(o => o == 300006) },
        { id: 300007, label: "Симулятор", checked: games_store.genres.some(o => o == 300007) },
        { id: 300008, label: "Инди", checked: games_store.genres.some(o => o == 300008) },
        { id: 300009, label: "Платформер", checked: games_store.genres.some(o => o == 300009) },
        { id: 300010, label: "Спортивная", checked: games_store.genres.some(o => o == 300010) },
        { id: 300011, label: "Гонка", checked: games_store.genres.some(o => o == 300011) },
        { id: 300012, label: "Аркада", checked: games_store.genres.some(o => o == 300012) },
        { id: 300013, label: "Казуальная", checked: games_store.genres.some(o => o == 300013) },
        { id: 300014, label: "Драки", checked: games_store.genres.some(o => o == 300014) },
        { id: 300015, label: "Стратегия", checked: games_store.genres.some(o => o == 300015) },
        { id: 300016, label: "Семейная", checked: games_store.genres.some(o => o == 300016) },
        { id: 300017, label: "Образовательная", checked: games_store.genres.some(o => o == 300017) },
        { id: 300018, label: "Настольная", checked: games_store.genres.some(o => o == 300018) },
        { id: 300019, label: "Карточная", checked: games_store.genres.some(o => o == 300019) },

    ];
    const years = [
        { id: 2024, label: 2024, checked: games_store.releaseDate.some(o => o == 2024) },
        { id: 2023, label: 2023, checked: games_store.releaseDate.some(o => o == 2023) },
        { id: 2022, label: 2022, checked: games_store.releaseDate.some(o => o == 2022) },
        { id: 2021, label: 2021, checked: games_store.releaseDate.some(o => o == 2021) },
        { id: 2020, label: 2020, checked: games_store.releaseDate.some(o => o == 2020) },
        { id: 2019, label: 2019, checked: games_store.releaseDate.some(o => o == 2019) },
        { id: 2018, label: 2018, checked: games_store.releaseDate.some(o => o == 2018) },
        { id: 2017, label: 2017, checked: games_store.releaseDate.some(o => o == 2017) },
        { id: 2016, label: 2016, checked: games_store.releaseDate.some(o => o == 2016) },
        { id: 2015, label: 2015, checked: games_store.releaseDate.some(o => o == 2015) },
        { id: 2014, label: 2014, checked: games_store.releaseDate.some(o => o == 2014) },
        { id: 2013, label: 2013, checked: games_store.releaseDate.some(o => o == 2013) },
        { id: 2012, label: 2012, checked: games_store.releaseDate.some(o => o == 2012) },
        { id: 2011, label: 2011, checked: games_store.releaseDate.some(o => o == 2011) },
        { id: 2010, label: 2010, checked: games_store.releaseDate.some(o => o == 2010) },
        { id: 2009, label: 2009, checked: games_store.releaseDate.some(o => o == 2009) },
        { id: 2008, label: 2008, checked: games_store.releaseDate.some(o => o == 2008) },
        { id: 2007, label: 2007, checked: games_store.releaseDate.some(o => o == 2007) },
        { id: 2006, label: 2006, checked: games_store.releaseDate.some(o => o == 2006) },
        { id: 2005, label: 2005, checked: games_store.releaseDate.some(o => o == 2005) },
        { id: 2004, label: 2004, checked: games_store.releaseDate.some(o => o == 2004) },
        { id: 2003, label: 2003, checked: games_store.releaseDate.some(o => o == 2003) },
        { id: 2002, label: 2002, checked: games_store.releaseDate.some(o => o == 2002) },
        { id: 2001, label: 2001, checked: games_store.releaseDate.some(o => o == 2001) },
        { id: 2000, label: 2000, checked: games_store.releaseDate.some(o => o == 2000) },
        { id: 1999, label: 1999, checked: games_store.releaseDate.some(o => o == 1999) },
        { id: 1998, label: 1998, checked: games_store.releaseDate.some(o => o == 1998) },
        { id: 1997, label: 1997, checked: games_store.releaseDate.some(o => o == 1997) },
        { id: 1996, label: 1996, checked: games_store.releaseDate.some(o => o == 1996) },
        { id: 1995, label: 1995, checked: games_store.releaseDate.some(o => o == 1995) },
        { id: 1994, label: 1994, checked: games_store.releaseDate.some(o => o == 1994) },
        { id: 1993, label: 1993, checked: games_store.releaseDate.some(o => o == 1993) },
        { id: 1992, label: 1992, checked: games_store.releaseDate.some(o => o == 1992) },
        { id: 1991, label: 1991, checked: games_store.releaseDate.some(o => o == 1991) },
        { id: 1990, label: 1990, checked: games_store.releaseDate.some(o => o == 1990) },
        { id: 1989, label: 1989, checked: games_store.releaseDate.some(o => o == 1989) },
        { id: 1988, label: 1988, checked: games_store.releaseDate.some(o => o == 1988) },
        { id: 1987, label: 1987, checked: games_store.releaseDate.some(o => o == 1987) },
        { id: 1986, label: 1986, checked: games_store.releaseDate.some(o => o == 1986) },
        { id: 1985, label: 1985, checked: games_store.releaseDate.some(o => o == 1985) },
        { id: 1984, label: 1984, checked: games_store.releaseDate.some(o => o == 1984) },
        { id: 1983, label: 1983, checked: games_store.releaseDate.some(o => o == 1983) },
        { id: 1982, label: 1982, checked: games_store.releaseDate.some(o => o == 1982) },
        { id: 1981, label: 1981, checked: games_store.releaseDate.some(o => o == 1981) },
        { id: 1980, label: 1980, checked: games_store.releaseDate.some(o => o == 1980) },
        { id: 1979, label: 1979, checked: games_store.releaseDate.some(o => o == 1979) },
        { id: 1978, label: 1978, checked: games_store.releaseDate.some(o => o == 1978) },
        { id: 1977, label: 1977, checked: games_store.releaseDate.some(o => o == 1977) },
        { id: 1976, label: 1976, checked: games_store.releaseDate.some(o => o == 1976) },
        { id: 1975, label: 1975, checked: games_store.releaseDate.some(o => o == 1975) },
        { id: 1974, label: 1974, checked: games_store.releaseDate.some(o => o == 1974) },
        { id: 1973, label: 1973, checked: games_store.releaseDate.some(o => o == 1973) },
        { id: 1972, label: 1972, checked: games_store.releaseDate.some(o => o == 1972) },
        { id: 1971, label: 1971, checked: games_store.releaseDate.some(o => o == 1971) },
        { id: 1970, label: 1970, checked: games_store.releaseDate.some(o => o == 1970) },
        { id: 1969, label: 1969, checked: games_store.releaseDate.some(o => o == 1969) },
        { id: 1968, label: 1968, checked: games_store.releaseDate.some(o => o == 1968) },
        { id: 1967, label: 1967, checked: games_store.releaseDate.some(o => o == 1967) },
        { id: 1966, label: 1966, checked: games_store.releaseDate.some(o => o == 1966) },
        { id: 1965, label: 1965, checked: games_store.releaseDate.some(o => o == 1965) },
        { id: 1964, label: 1964, checked: games_store.releaseDate.some(o => o == 1964) },
        { id: 1963, label: 1963, checked: games_store.releaseDate.some(o => o == 1963) },
        { id: 1962, label: 1962, checked: games_store.releaseDate.some(o => o == 1962) },
        { id: 1961, label: 1961, checked: games_store.releaseDate.some(o => o == 1961) },
        { id: 1960, label: 1960, checked: games_store.releaseDate.some(o => o == 1960) },
        { id: 1959, label: 1959, checked: games_store.releaseDate.some(o => o == 1959) },
        { id: 1958, label: 1958, checked: games_store.releaseDate.some(o => o == 1958) },
        { id: 1957, label: 1957, checked: games_store.releaseDate.some(o => o == 1957) },
        { id: 1956, label: 1956, checked: games_store.releaseDate.some(o => o == 1956) },
        { id: 1955, label: 1955, checked: games_store.releaseDate.some(o => o == 1955) },
        { id: 1954, label: 1954, checked: games_store.releaseDate.some(o => o == 1954) },
    ]
    const ageRating = [
        { id: 320004, label: 'Для всех', checked: games_store.ageRating.some(o => o == 320004) },
        { id: 320001, label: "Для всех 10+", checked: games_store.ageRating.some(o => o == 320001) },
        { id: 320002, label: "Подростки", checked: games_store.ageRating.some(o => o == 320002) },
        { id: 320000, label: "Для взрослых", checked: games_store.ageRating.some(o => o == 320000) },
        { id: 320003, label: "Только для взрослых 18+", checked: games_store.ageRating.some(o => o == 320003) },
        { id: 320005, label: "Рейтинг ожидается", checked: games_store.ageRating.some(o => o == 320005) },
    ];

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
        if (!games_store.releaseDate.find((i) => i === key)) {
            games_store.setRelease([...games_store.releaseDate, key])
        }
        else {
            let index = games_store.releaseDate.indexOf(key);
            if (index !== -1) {
                games_store.releaseDate.splice(index, 1)
            }
        }
    }
    const handleAgeRatingChange = (key: any) => {
        if (!games_store.ageRating.find((i) => i === key)) {
            games_store.setAgeRating([...games_store.ageRating, key])
        }
        else {
            let index = games_store.ageRating.indexOf(key);
            if (index !== -1) {
                games_store.ageRating.splice(index, 1)
            }
        }
    }
    const SubmitFilter = () => {
        games_store.filterGames(games_store.genres, games_store.platforms, games_store.ageRating, games_store.releaseDate, 0, games_store.sort)
    }

    const ClearFilter = () => {
        games_store.setGenre([])
        games_store.setPlatform([])
        games_store.setRelease([])
        games_store.setAgeRating([])
        games_store.filterGames(null, null, null, null, 0, games_store.sort)

    }
    return (

        <div className={styles.filters_wrapper} >
            <div className={styles.main_wrapper} >


                <div className={styles.card_header}>
                    <div className={styles.exit_button} >
                        <div onClick={() => (setIsShow(false))} className={styles.cross_icon}>
                            <CrossIcon className='general-icon' />
                        </div>
                    </div>
                </div>
                <span className={styles.block_header}>
                    Жанр
                </span>
                <div className={styles.block_wrapper}>
                    {genres.map(item => (
                        <div key={item.id} className={styles.item_wrapper}>
                            <CustomCheckbox id={String(item.id)} checked={item.checked} onClick={() => handleGenresChange(item.id)} labelname={item.label} />
                        </div>
                    ))}

                </div>
                <span className={styles.block_header}>
                    Платформа
                </span>
                <div className={styles.block_wrapper}>
                    {platforms.map(item => (
                        <div key={item.id} className={styles.item_wrapper}>
                            <CustomCheckbox id={String(item.id)} checked={item.checked} onClick={() => handlePlatformsChange(item.id)} labelname={item.label} />
                        </div>
                    ))}
                </div>
                <span className={styles.block_header}>
                    Возрастной рейтинг
                </span>
                <div className={styles.block_wrapper}>
                    {ageRating.map(item => (
                        <div key={item.id} className={styles.item_wrapper}>
                            <CustomCheckbox id={String(item.id)} checked={item.checked} onClick={() => handleAgeRatingChange(item.id)} labelname={String(item.label)} />
                        </div>
                    ))}
                </div>
                <span className={styles.block_header}>
                    Год
                </span>
                <div className={styles.block_wrapper}>

                    {years.map(item => (
                        <div key={item.id} className={styles.item_wrapper}>
                            <CustomCheckbox id={String(item.id)} checked={item.checked} onClick={() => handleYearChange(item.id)} labelname={String(item.label)} />
                        </div>
                    ))}
                </div>

                <ServiceButtonLong type={'button'} onClick={() => (SubmitFilter(), setIsShow(false))}>Применить фильтры</ServiceButtonLong>
                <ServiceButtonLong type={'button'} onClick={() => (ClearFilter())}>Сбросить фильтры</ServiceButtonLong>
            </div>
        </div>


    )

}

export default observer(FiltersCard)
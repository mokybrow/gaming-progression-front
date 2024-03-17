'use client'

import { Genre, Platform } from '@/models/gamesModel';
import styles from './filters.module.css'

import { useContext, useState } from 'react';
import { Context } from '@/app/providers';
import { GENRES } from '@/constants/genres';
import { YEARS } from '@/constants/years';
import { PLATFORMS } from '@/constants/platforms';
import { observer } from 'mobx-react-lite';
import { ServiceButton } from '@/components/buttons/ServiceButton';
import VerticalSlider from '@/components/slider/YearSlider';


function FiltersCard() {
    const { games_store } = useContext(Context);

    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [selectedYear, setSelectedYear] = useState<number[]>([]);

    const handleGenresChange = (event: any) => {
        const checkedId = event.target.value;
        if (event.target.checked) {
            setSelectedGenres([...selectedGenres, checkedId])
        } else {
            setSelectedGenres(selectedGenres.filter(id => id !== checkedId))
        }
    }
    const handlePlatformsChange = (event: any) => {
        const checkedId = event.target.value;
        if (event.target.checked) {
            setSelectedPlatforms([...selectedPlatforms, checkedId])
        } else {
            setSelectedPlatforms(selectedPlatforms.filter(id => id !== checkedId))
        }
    }
    const handleYearChange = (event: any) => {
        const checkedId = event.target.value;
        if (event.target.checked) {
            setSelectedYear([...selectedYear, Number(checkedId)])
        } else {
            setSelectedYear(selectedYear.filter(id => id !== checkedId))
        }
    }
    const SubmitFilter = () => {
        games_store.setGenre(selectedGenres)
        games_store.setPlatform(selectedPlatforms)
        games_store.setRelease([...selectedYear, ...games_store.release_date])
        games_store.setLimit(21)
        games_store.getAllGames(games_store.genres, games_store.platforms, null, games_store.release_date, games_store.limit, 0, games_store.sort)
    }
    const ClearFilter = () => {
        games_store.setGenre([])
        games_store.setPlatform([])
        games_store.setRelease([])
        games_store.setLimit(21)
        games_store.getAllGames(games_store.genres, games_store.platforms, null, games_store.release_date, games_store.limit, 0, games_store.sort)
    }
    return (

        <div className={styles.filters_wrapper} >
            <div className={styles.filter}>
                <div className={styles.block_wrapper}>
                    <h4>
                        Жанр
                    </h4>
                    <div className={styles.choose_section}>
                        {Object.keys(GENRES).map((key, index) => (
                            <div key={index} className={styles.list_style} >
                                <input type="checkbox"
                                    value={key}
                                    onChange={(event) => { handleGenresChange(event) }}
                                    defaultChecked={games_store.genres.includes(key)} />
                                <span>{GENRES[key]}</span>
                            </div>
                        ))}
                    </div>

                </div>
                <div className={styles.block_wrapper}>
                    <h4>
                        Платформа
                    </h4>
                    <div className={styles.choose_section}>
                        {Object.keys(PLATFORMS).map(key => (
                            <div key={key} className={styles.list_style} >
                                <input type="checkbox"
                                    value={key}
                                    onChange={(event) => { handlePlatformsChange(event) }}
                                    defaultChecked={games_store.platforms.includes(key)}
                                /><span>{PLATFORMS[key]}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.block_wrapper}>
                    <h4>
                        Год Выхода
                    </h4>
                    <div className={styles.choose_section}>
                        {YEARS.map((key, index) => (
                            <div key={index} className={styles.list_style} >
                                <input type="checkbox" value={key}
                                    onChange={(event) => { handleYearChange(event) }}
                                    defaultChecked={games_store.release_date.includes(key)} />
                                <span>{key}</span>
                            </div>
                        ))}
                    </div>
                    <div className={styles.slider_block_wrapper}>
                        <div className={styles.slider_wrapper}>
                            <VerticalSlider />
                        </div>
                    </div>
                </div>
                <ServiceButton type={'button'} onClick={() => SubmitFilter()}>Применить фильтры</ServiceButton>
                <ServiceButton type={'button'} onClick={() => {ClearFilter(), games_store.setSliderValues([1954, 2024])}}>Сбросить фильтры</ServiceButton>
            </div>
        </ div>
    )

}

export default observer(FiltersCard)
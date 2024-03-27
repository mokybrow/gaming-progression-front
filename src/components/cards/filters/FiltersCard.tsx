'use client'

import styles from './filters.module.css'

import { useContext, useState } from 'react';
import { Context } from '@/app/providers';
import { GENRES } from '@/constants/genres';
import { FIVEYEARS, YEARS } from '@/constants/years';
import { PLATFORMS } from '@/constants/platforms';
import { observer } from 'mobx-react-lite';
import { ServiceButton } from '@/components/buttons/ServiceButton';


function FiltersCard() {
    const { games_store } = useContext(Context);

    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

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
        const data = checkedId.split(',').map(Number)
        games_store.setRelease([...data])

    }
    const SubmitFilter = () => {
        games_store.setGenre(selectedGenres)
        games_store.setPlatform(selectedPlatforms)
        games_store.setLimit(21)
        games_store.getAllGames(games_store.genres, games_store.platforms, null, games_store.release_date, games_store.limit, 0, games_store.sort)
    }
    const ClearFilter = () => {
        games_store.setGenre([])
        games_store.setPlatform([])
        games_store.setRelease([])
        games_store.setLimit(21)
        setSelectedGenres([])
        setSelectedPlatforms([])

        games_store.getAllGames([], [], null, [], games_store.limit, 0, games_store.sort)

    }
    return (

        <div className={styles.filters_wrapper} >
            <form action="
            ">
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
                                    // defaultChecked={games_store.platforms.includes(key)}
                                    /><span>{PLATFORMS[key]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.block_wrapper}>
                        <h4>
                            Десятилетие
                        </h4>
                        <div className={styles.choose_section}>
                            {Object.keys(FIVEYEARS).map(key => (
                                <div key={key} className={styles.list_style} >
                                    <input type="radio" name="year"
                                        value={String(FIVEYEARS[key])}
                                        onChange={(event) => handleYearChange(event)}
                                        onClick={(event) => handleYearChange(event)}

                                    /><span>{key}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.block_wrapper}>
                        <h4>
                            Год
                        </h4>
                        <div className={styles.choose_section}>
                            {YEARS.map((key, index) => (
                                <div key={index} className={styles.list_style} >
                                    <input type="radio" name="year"
                                        value={key}
                                        onChange={(event) => handleYearChange(event)}
                                        onClick={(event) => handleYearChange(event)}
                                    />
                                    <span>{key}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <ServiceButton type={'button'} onClick={() => SubmitFilter()}>Применить фильтры</ServiceButton>
                    <ServiceButton type={'reset'} onClick={() => ClearFilter()}>Сбросить фильтры</ServiceButton>
                </div>
            </form>

        </ div>
    )

}

export default observer(FiltersCard)
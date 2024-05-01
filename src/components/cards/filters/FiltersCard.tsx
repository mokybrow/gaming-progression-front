'use client'

import styles from './filters.module.css'

import { useContext, useEffect, useState } from 'react';
import { Context } from '@/app/providers';
import { GENRES } from '@/constants/genres';
import { FIVEYEARS, YEARS } from '@/constants/years';
import { PLATFORMS } from '@/constants/platforms';
import { observer } from 'mobx-react-lite';
import ServiceButtonLong from '@/components/buttons/servicelong/ServiceButtonLong';


export interface ModalProps {
    setIsShow: any
}


function FiltersCard({ setIsShow }: ModalProps) {
    const { games_store } = useContext(Context);

    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    useEffect(() => {
        
        setSelectedGenres([...games_store.genres])
        setSelectedPlatforms([...games_store.platforms])

    }, [games_store])
    
    const handleGenresChange = (key: any) => {

        if (!selectedGenres.find((i) => i === key)) {
            selectedGenres.push(key)
        }
        else {
            let index = selectedGenres.indexOf(key);

            if (index !== -1) {
                selectedGenres.splice(index, 1);
            }
        }

    }
    const handlePlatformsChange = (key: any) => {
  

        if (!selectedPlatforms.find((i) => i === key)) {
            selectedPlatforms.push(key)
        }
        else {
            let index = selectedPlatforms.indexOf(key);

            if (index !== -1) {
                selectedPlatforms.splice(index, 1);
            }
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
        games_store.filterGames(games_store.genres, games_store.platforms, null, games_store.release_date,  0, games_store.sort)
    }

    const ClearFilter = () => {
        games_store.setGenre([])
        games_store.setPlatform([])
        games_store.setRelease([])
        games_store.setLimit(21)
        setSelectedGenres([])
        setSelectedPlatforms([])

        games_store.filterGames([], [], null, [],  0, games_store.sort)

    }
    return (

        <div className={styles.filters_wrapper} >
            <form action="">
                <h4>
                    Жанр
                </h4>
                <div className={styles.block_wrapper}>
                    <div className={styles.choose_section}>
                        {Object.keys(GENRES).map((key, index) => (
                            <div key={index} className={styles.list_style} >
                                <input type="checkbox"
                                    value={key}
                                    onClick={() => handleGenresChange(key)}
                                    defaultChecked={games_store.genres.includes(key)} />
                                <span>{GENRES[key]}</span>
                            </div>
                        ))}
                    </div>

                </div>
                <h4>
                    Платформа
                </h4>
                <div className={styles.block_wrapper}>
                    <div className={styles.choose_section}>
                        {Object.keys(PLATFORMS).map(key => (
                            <div key={key} className={styles.list_style} >
                                <input type="checkbox"
                                    value={key}
                                    onClick={() => handlePlatformsChange(key)}
                                defaultChecked={games_store.platforms.includes(key)}
                                /><span>{PLATFORMS[key]}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <h4>
                    Десятилетие
                </h4>
                <div className={styles.block_wrapper}>
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
                <h4>
                    Год
                </h4>
                <div className={styles.block_wrapper}>
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
                <ServiceButtonLong type={'button'} onClick={() => (SubmitFilter(), setIsShow(false))}>Применить фильтры</ServiceButtonLong>
                <ServiceButtonLong type={'reset'} onClick={() => (ClearFilter(), setIsShow(false))}>Сбросить фильтры</ServiceButtonLong>
            </form>
        </div>

    )

}

export default observer(FiltersCard)
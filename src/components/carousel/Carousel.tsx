import { useContext, useState } from 'react'
import ArrowRightIcon from '../icons/arrowRight'
import ArrowLeftIcon from '../icons/arrowLeft'
import styles from './carousel.module.css'
import CrossIcon from '../icons/cross'
import { Context } from '@/app/providers'
import { observer } from 'mobx-react-lite'
import { Pictures } from '@/models/wallsModels'
import { PicturesModel } from '@/models/serviceModel'
import { FullScreenPopup } from '../popup/main_popup/FullScreenPopup'
import Image from 'next/image'

export interface CardProps {
    images: PicturesModel[] | Pictures[],
    status: boolean
}

const Carousel = ({ images, status }: CardProps) => {

    const [slide, setSlide] = useState(0)
    const [isShow, setIsShow] = useState(false);

    const { content_store } = useContext(Context);

    const nextSlide = () => {
        setSlide(slide === images.length - 1 ? 0 : slide + 1)

    }
    const previousSlide = () => {
        setSlide(slide === 0 ? images.length - 1 : slide - 1)

    }
    const deleteImage = (index: number) => {

        content_store.images.splice(index, 1);
        if (slide !== 0) {
            setSlide(images.length - 1)
        }
        if (content_store.images.length === 1) {
            setSlide(0)
        }
    }
    const zoomImage = () => {
        setIsShow(true)
    }
    return (
        <>
            <FullScreenPopup active={isShow} setActive={setIsShow}>
                <div className={styles.carousel_wrapper_full_screen} >

                    {
                        images?.length > 1 ?
                            <div className={styles.icon_wrapper_left} onClick={() => previousSlide()}>
                                <ArrowLeftIcon className="general-icon" />
                            </div> :
                            null
                    }
                    {images?.map((image, index) => (

                        <div className={slide === index ? styles.slide_wrapper_full_screen : styles.slide_wrapper_hidden} key={index}>

                            <div className={styles.cross_icon_wrapper} onClick={() => setIsShow(false)}>
                                <CrossIcon className="general-icon" />
                            </div>


                            <img src={images === null ? '' : image.picture_path} alt="" className={slide === index ? styles.slide_full_screen : styles.slide_hidden} />

                            {
                                images?.length > 1 ?
                                    <div className={slide === index ? styles.image_counter : styles.slide_hidden}>{index + 1}/{images.length}</div>
                                    :
                                    null
                            }
                        </div>

                    ))}
                    {
                        images?.length > 1 ?
                            <div className={styles.icon_wrapper_right} onClick={() => nextSlide()}>
                                <ArrowRightIcon className="general-icon" />
                            </div>
                            :
                            null
                    }
                </div>

            </FullScreenPopup>
            <div className={styles.carousel_wrapper}>
                {
                    images?.length > 1 ?
                        <div className={styles.icon_wrapper_left} onClick={() => previousSlide()}>
                            <ArrowLeftIcon className="general-icon" />
                        </div> :
                        null
                }
                {images?.map((image, index) => (

                    <div className={slide === index ? styles.slide_wrapper : styles.slide_wrapper_hidden} key={index}>
                        {status ?
                            <div className={styles.cross_icon_wrapper} onClick={() => deleteImage(index)}>
                                <CrossIcon className="general-icon" />
                            </div>
                            : null}

                        <img src={images === null ? '' : image.picture_path} alt="" className={slide === index ? styles.slide_blur : styles.slide_blur_hidden} />
                        <img src={images === null ? '' : image.picture_path} alt="" className={slide === index ? styles.slide : styles.slide_hidden} onClick={() => zoomImage()} />
                        {
                            images?.length > 1 ?
                                <div className={slide === index ? styles.image_counter : styles.slide_hidden}>{index + 1}/{images.length}</div>
                                :
                                null
                        }
                    </div>

                ))}
                {
                    images?.length > 1 ?
                        <div className={styles.icon_wrapper_right} onClick={() => nextSlide()}>
                            <ArrowRightIcon className="general-icon" />
                        </div>
                        :
                        null
                }
            </div>
        </>
    )
}

export default observer(Carousel)
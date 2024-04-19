'use client'

import ArrowLeftIcon from '@/components/icons/arrowLeft';
import styles from './leave.module.css'

import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';



export interface CardProps {

    setIsShow: any

}

function LeavePostCard({ setIsShow }: CardProps) {

    return (

        <div className={styles.leave_card_wrapper}>
            <div className={styles.leave_icon} onClick={() => setIsShow(false)}>
                <ArrowLeftIcon className='general-icon' />
            </div>
            {/* <div className={styles.border_line}>
            </div> */}
        </div>


    )

}

export default observer(LeavePostCard)
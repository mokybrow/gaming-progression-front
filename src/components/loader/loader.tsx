import { FC } from "react";
import Skeleton, { SkeletonProps } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'


const SkeletonLoader:FC<SkeletonProps> = ({className, ...rest})=>{
    return(
        <Skeleton {...rest}/>

    )
}

export default SkeletonLoader;
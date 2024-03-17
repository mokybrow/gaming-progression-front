import { useEffect, useRef, useState } from "react";



export default function useOutside(ref: any, callback: any){

    const handleClick = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            callback()
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleClick, true)
        return()=>{
            document.removeEventListener('click', handleClick, true)
        }
    })
  
}
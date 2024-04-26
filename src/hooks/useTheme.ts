'use-client'

import { useLayoutEffect, useState } from "react"

if (typeof window !== "undefined") {
    var isDarkTheme = window?.matchMedia('(prefers-color-scheme: dark').matches
    var defaultTheme = isDarkTheme ? 'dark' : 'light'
}

export const useTheme = () => {
    
    const [theme, setTheme] = useState(typeof window !== "undefined" ? localStorage.getItem('app-theme')  || defaultTheme : defaultTheme)

    useLayoutEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('app-theme', theme)
    }, [theme])

    return { theme, setTheme }

}
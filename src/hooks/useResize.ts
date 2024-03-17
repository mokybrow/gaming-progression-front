// use-resize.js
import { useState, useEffect } from 'react';

export const useResize = () => {
    if (typeof document !== 'undefined') {
        const [width, setWidth] = useState(document.documentElement.clientWidth);

        useEffect(() => {
            const handleResize = (event: any) => {
                setWidth(event.target.document.documentElement.clientWidth);
            };
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }, []);

        return {
            width,

        };
    }
};
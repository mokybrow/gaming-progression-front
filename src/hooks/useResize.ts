// // use-resize.js

// 'use client'
// import { useState, useEffect } from 'react';

// export const useResize = () => {

//     const [width, setWidth] = useState(window.innerWidth);

//     useEffect(() => {
//         const handleResize = (event: any) => {
//             setWidth(event.target.document.documentElement.clientWidth);
//         };
//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);

//         };

//     }, []);

//     return width;

// };
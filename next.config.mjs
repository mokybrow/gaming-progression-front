/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.rawg.io',
                port: '',
                pathname: '/media/**',
            },
        ],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'pictures.mbrw.ru',
                port: '',
                pathname: '/**',
            },
        ],
    },
};


export default nextConfig;

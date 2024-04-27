
interface CheckboxProps {
    className?: string;
}

const FeedIcon = ({ className }: CheckboxProps) => {
    return (
        <svg height="800px" width="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M21.0074 9.36365H3.17438"   strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.7 3H18.3C19.0161 3 19.7028 3.28446 20.2092 3.79081C20.7155 4.29716 21 4.98392 21 5.7V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V5.7C3 4.98392 3.28446 4.29716 3.79081 3.79081C4.29716 3.28446 4.98392 3 5.7 3Z"  strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    );
};

export default FeedIcon;
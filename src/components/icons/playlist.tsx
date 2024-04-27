
interface CheckboxProps {
    className?: string;
}

const PlaylistIcon = ({ className }: CheckboxProps) => {
    return (
        <svg height="800px" width="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M10.7143 10.0714V13.9286L14.5714 12L10.7143 10.0714ZM21 18.4286V5.57143C21 4.15127 19.8488 3 18.4286 3H5.57143C4.15127 3 3 4.15127 3 5.57143V18.4286C3 19.8488 4.15127 21 5.57143 21H18.4286C19.8488 21 21 19.8488 21 18.4286Z"  strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    );
};

export default PlaylistIcon;
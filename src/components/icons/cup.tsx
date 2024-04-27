
interface CheckboxProps {
    className?: string;
}

const CupIcon = ({ className }: CheckboxProps) => {
    return (

        <svg width="800px" height="800px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="cupIconTitle" strokeLinecap="round" strokeLinejoin="round" fill="none" className={className}>
            <path d="M6 2L18 2 18 11C18 14.3137085 15.3137085 17 12 17 8.6862915 17 6 14.3137085 6 11L6 2zM7 21L17 21" /> <path d="M12,17 L12,21" /> <path d="M6 5L6 11 5 11C3.34314575 11 2 9.65685425 2 8 2 6.34314575 3.34314575 5 5 5L6 5zM18 11L18 5 19 5C20.6568542 5 22 6.34314575 22 8 22 9.65685425 20.6568542 11 19 11L18 11z" />
        </svg>
    );
};

export default CupIcon;
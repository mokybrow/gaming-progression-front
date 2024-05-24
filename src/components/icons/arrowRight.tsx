
interface CheckboxProps {
    className?: string;
}

const ArrowRightIcon = ({ className }: CheckboxProps) => {
    return (
        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M6 12H18M18 12L13 7M18 12L13 17" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
};

export default ArrowRightIcon;
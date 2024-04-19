
interface CheckboxProps {
    className?: string;
}

const CrossIcon = ({ className }: CheckboxProps) => {
    return (
        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M19 5L5 19M5.00001 5L19 19" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
};

export default CrossIcon;
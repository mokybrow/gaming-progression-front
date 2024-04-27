
interface CheckboxProps {
    className?: string;
}

const MenuIcon = ({ className }: CheckboxProps) => {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M5.3335 8H26.6668M5.3335 16H26.6668M5.3335 24H26.6668" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    );
};

export default MenuIcon;

interface CheckboxProps {
    className?: string;
}

const MenuIcon = ({ className }: CheckboxProps) => {
    return (

        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M4 6H20M4 12H20M4 18H20" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    );
};

export default MenuIcon;
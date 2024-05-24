
interface CheckboxProps {
    className?: string;
}

const BlockIcon = ({ className }: CheckboxProps) => {
    return (
        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M18.364 18.364C19.9926 16.7353 21 14.4853 21 12C21 7.02944 16.9706 3 12 3C9.51472 3 7.26472 4.00736 5.63604 5.63604M18.364 18.364C16.7353 19.9926 14.4853 21 12 21C7.02944 21 3 16.9706 3 12C3 9.51472 4.00736 7.26472 5.63604 5.63604M18.364 18.364L5.63604 5.63604" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default BlockIcon;
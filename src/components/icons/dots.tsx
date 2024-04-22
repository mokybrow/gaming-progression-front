
interface CheckboxProps {
    className?: string;
}

const DotsIcon = ({ className }: CheckboxProps) => {
    return (
        <svg height="800px" width="800px" id="Layer_1" data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={className}>
            <path  d="M8,6.5A1.5,1.5,0,1,1,6.5,8,1.5,1.5,0,0,1,8,6.5ZM.5,8A1.5,1.5,0,1,0,2,6.5,1.5,1.5,0,0,0,.5,8Zm12,0A1.5,1.5,0,1,0,14,6.5,1.5,1.5,0,0,0,12.5,8Z" />
        </svg>
    );
};

export default DotsIcon;
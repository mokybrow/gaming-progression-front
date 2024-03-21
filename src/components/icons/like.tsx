
interface CheckboxProps {
    className?: string;
}

const LikeIcon = ({ className }: CheckboxProps) => {
    return (
        <svg version='1.1'
            id='Capa_1'
            x='0px'
            y='0px'
            viewBox='0 0 18 18'
            width='18'
            height='18' xmlns="http://www.w3.org/2000/svg"
            className={ className}
            >

            <g >
                <path d="M11.775 3C14.1525 3 15.75 5.235 15.75 7.32C15.75 11.5425 9.12 15 9 15C8.88 15 2.25 11.5425 2.25 7.32C2.25 5.235 3.8475 3 6.225 3C7.59 3 8.4825 3.6825 9 4.2825C9.5175 3.6825 10.41 3 11.775 3Z"/>
            </g>
        </svg>
    );
};

export default LikeIcon;
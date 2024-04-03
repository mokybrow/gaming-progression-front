
interface CheckboxProps {
    className?: string;
}

const RepostIcon = ({ className }: CheckboxProps) => {
    return (
        <svg version='1.1'
            id='Capa_1'
            x='0px'
            y='0px'
            viewBox='0 0 18 18'
            width='18'
            height='18' xmlns="http://www.w3.org/2000/svg"
            className={className}>
            <g >
                <path d="M4.5 10.4999V6.7499C4.50266 5.79673 4.80791 4.86902 5.37176 4.1005C5.93561 3.33197 6.72893 2.76234 7.63735 2.47372C8.54578 2.18509 9.5224 2.19237 10.4264 2.49452C11.3304 2.79666 12.1152 3.37806 12.6675 4.1549"  />
                <path d="M6 9L4.5 10.5L3 9" />
                <path d="M13.5 7.5V11.25C13.4973 12.2032 13.1921 13.1309 12.6282 13.8994C12.0644 14.6679 11.2711 15.2376 10.3626 15.5262C9.45421 15.8148 8.47759 15.8075 7.57357 15.5054C6.66955 15.2032 5.88481 14.6218 5.33249 13.845" />
                <path d="M12 9L13.5 7.5L15 9" />
            </g>
        </svg>
    );
};

export default RepostIcon;
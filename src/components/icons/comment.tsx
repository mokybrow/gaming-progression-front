
interface CheckboxProps {
    className?: string;
}

const CommentIcon = ({ className }: CheckboxProps) => {
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
            <path d="M9 15.75C12.728 15.75 15.75 12.728 15.75 9C15.75 5.27208 12.728 2.25 9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 10.1157 2.5207 11.1682 3 12.0954L2.25 15.75L5.9046 15C6.83178 15.4793 7.8843 15.75 9 15.75Z"/>
            </g>
        </svg>
    );
};

export default CommentIcon;
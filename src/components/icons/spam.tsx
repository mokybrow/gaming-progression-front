
interface CheckboxProps {
    className?: string;
}

const SpamIcon = ({ className }: CheckboxProps) => {
    return (

        <svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
        <g>
            <path fill="none" d="M0 0h24v24H0z"/>
            <path fillRule="nonzero" d="M15.936 2.5L21.5 8.067v7.87L15.936 21.5h-7.87L2.5 15.936v-7.87L8.066 2.5h7.87zm-.829 2H8.894L4.501 8.895v6.213l4.393 4.394h6.213l4.394-4.394V8.894l-4.394-4.393zM8 11h8v2H8v-2z"/>
        </g>
    </svg>
    );
};

export default SpamIcon;
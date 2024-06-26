
interface CheckboxProps {
    className?: string;
}

const ReportIcon = ({ className }: CheckboxProps) => {
    return (
        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <g id="Navigation / Flag">
                <path id="Vector" d="M4 21V15.6871M4 15.6871C9.81818 11.1377 14.1818 20.2363 20 15.6869V4.31347C14.1818 8.86284 9.81818 -0.236103 4 4.31327V15.6871Z" strokeLinecap="round" strokeLinejoin="round" />
            </g>
        </svg>
    );
};

export default ReportIcon;
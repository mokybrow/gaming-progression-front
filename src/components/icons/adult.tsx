
interface CheckboxProps {
    className?: string;
}

const AdultIcon = ({ className }: CheckboxProps) => {
    return (
        <svg width="800px" height="800px" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M19.45,19.42a10.5,10.5,0,1,1,0-14.84" /><rect x="11.07" y="8.18" width="4.77" height="3.82" rx="1.91" /><rect x="11.07" y="12" width="4.77" height="3.82" rx="1.91" /><line x1="7.25" y1="7.23" x2="7.25" y2="15.82" /><line x1="5.34" y1="15.82" x2="9.16" y2="15.82" /><line x1="5.34" y1="9.14" x2="8.2" y2="9.14" /><line x1="17.75" y1="12" x2="23.48" y2="12" /><line x1="20.61" y1="9.14" x2="20.61" y2="14.86" />
        </svg>
    );
};

export default AdultIcon;
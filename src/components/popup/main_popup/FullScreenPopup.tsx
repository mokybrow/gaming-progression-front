'use client'


export interface ModalProps {
    active: boolean,
    children: any,
    setActive: any,
}

export function FullScreenPopup({ active, children, setActive, ...rest }: ModalProps) {
    if (active) {
        if (typeof document !== 'undefined') {
            const body = document.body;
            body.style.height = '100vh';
            body.style.overflowY = 'hidden';

        }
    } else {
        if (typeof document !== 'undefined') {
            const body = document.body;
            body.style.position = '';
            body.style.top = '';
            body.style.height = '';
            body.style.overflowY = '';
        }
    }
    return (
        <div className={active ? 'modal activemodal' : 'modal'}
            onClick={() => setActive(false)}>
            <div className={active ? 'modal_content activemodal' : 'modal_content'} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>

    )

}

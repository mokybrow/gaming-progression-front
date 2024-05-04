'use client'


export interface ModalProps {
    active: boolean,
    children: any,
    setActive: any,
}

export function FullScreenPopup({ active, children, setActive, ...rest }: ModalProps) {
    if (active) {
        if (typeof document !== 'undefined') {
            document.body.classList.add('modal_open')
        }
    } else {
        if (typeof document !== 'undefined') {
            document.body.classList.remove('modal_open')
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

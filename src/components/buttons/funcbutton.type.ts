import { ButtonHTMLAttributes, InputHTMLAttributes } from "react"

export interface IButtonsProps {
    type: string
    width?: number
    height?: number
    bg_color: string
    fontSize: number
}

export type FuncTypeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & IButtonsProps
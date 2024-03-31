import { ButtonHTMLAttributes, InputHTMLAttributes } from "react"

export interface IButtonsProps {
    type: string
    width?: number
    height?: number
    bg_color: string
    fontSize: number
    color?: string
}

export type FuncTypeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & IButtonsProps
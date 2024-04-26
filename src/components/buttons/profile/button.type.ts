import { ButtonHTMLAttributes, InputHTMLAttributes } from "react"

export interface IButtonsProps {
    type: string
    width?: number
    height?: number
}

export type TypeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & IButtonsProps
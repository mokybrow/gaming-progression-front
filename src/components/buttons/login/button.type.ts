import { ButtonHTMLAttributes, InputHTMLAttributes } from "react"

export interface IButtonsProps {
    type: string
}

export type TypeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & IButtonsProps
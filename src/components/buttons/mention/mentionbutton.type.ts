import { ButtonHTMLAttributes, InputHTMLAttributes } from "react"

export interface IButtonsProps {
    type: string

}

export type MentionTypeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & IButtonsProps
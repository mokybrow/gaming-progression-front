import { InputHTMLAttributes } from "react"

export interface IFieldProps {
    placeholder: string
    type: string
    id: string
    labelname: string
    width?: number
    height?: number
}

export type TypeInputProps = InputHTMLAttributes<HTMLInputElement> & IFieldProps
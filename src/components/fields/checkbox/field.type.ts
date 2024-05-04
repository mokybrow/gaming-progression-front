import { InputHTMLAttributes } from "react"

export interface IFieldProps {
    id: string
    labelname: string
}

export type TypeInputProps = InputHTMLAttributes<HTMLInputElement> & IFieldProps
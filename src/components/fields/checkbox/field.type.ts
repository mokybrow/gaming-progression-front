import { InputHTMLAttributes } from "react"

export interface IFieldProps {
    id: string | number
    labelname: string
}

export type TypeInputProps = InputHTMLAttributes<HTMLInputElement> & IFieldProps
import { InputHTMLAttributes } from 'react';

export interface ControlledInputOTPProps extends InputHTMLAttributes<HTMLInputElement> {
    fieldName: keyof Record<string, (e: ChangeEvent<HTMLInputElement>) => void>;
    length: number;
    containerClassName?: string;
    className?: string;
}
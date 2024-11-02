"use client"

import { ChangeEvent, InputHTMLAttributes } from 'react';
import { useControlledFormContext } from './ControlledForm';

interface IFormInput extends InputHTMLAttributes<HTMLInputElement> {
    fieldName: keyof Record<string, (e: ChangeEvent<HTMLInputElement>) => void>;
}

export const ControlledInput = ({
    fieldName,
    ...props
}: IFormInput) => {
    const { register, errors, maskFunctions } = useControlledFormContext();

    return (
        <>
            <input
                {...register(fieldName)}
                {...props}
                autoComplete={props?.autoComplete || "off"}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (maskFunctions) maskFunctions[fieldName](e);
                }}
            />
            <p className='text-red-500 min-h-6 mb-2 text-sm self-start'>{errors[fieldName]?.message as string}</p>
        </>
    );
};


"use client";

import { ChangeEvent, InputHTMLAttributes } from 'react';
import { useControlledFormContext } from './controlled-form';

interface IFormInput extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    fieldName: keyof Record<string, (e: ChangeEvent<HTMLInputElement>) => void>;
    includeInForm?: boolean;
}

export const ControlledInput = ({
    fieldName,
    includeInForm = true,
    ...props
}: IFormInput) => {
    const { register, errors, maskFunctions, setForm } = useControlledFormContext();

    return (
        <>
            <input
                {...props}
                {...register(fieldName)}
                autoComplete={props?.autoComplete || "on"}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => maskFunctions && maskFunctions[fieldName](e)}
                onChange={(e) => {
                    if (includeInForm) {
                        setForm((prev) => ({
                            ...prev,
                            [fieldName]: e.target.value,
                        }));
                    }
                }}
            />
            <p className='text-red-500 min-h-6 mb-2 text-sm self-start leading-none'>{errors[fieldName]?.message as string}</p>
        </>
    );
};

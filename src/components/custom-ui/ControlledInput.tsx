"use client";

import { ChangeEvent, Dispatch, InputHTMLAttributes } from 'react';
import { useControlledFormContext } from './ControlledForm';

interface IFormInput extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    fieldName: keyof Record<string, (e: ChangeEvent<HTMLInputElement>) => void>;
    onChange?: (e: ChangeEvent<HTMLInputElement>, setForm: Dispatch<React.SetStateAction<object>>) => void;
}

export const ControlledInput = ({
    fieldName,
    onChange,
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange && onChange(e, setForm)}
            />      
            <p className='text-red-500 min-h-6 mb-2 text-sm self-start'>{errors[fieldName]?.message as string}</p>
        </>
    );
};

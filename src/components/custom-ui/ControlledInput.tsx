"use client";

import { useControlledFormContext } from './ControlledForm';
import { ControlledInputProps } from '@/types/ControlledInput.types';

export const ControlledInput = ({
    fieldName,
    includeInForm = true,
    ...props
}: ControlledInputProps) => {
    const { register, errors, maskFunctions, setForm } = useControlledFormContext();

    return (
        <>
            <input
                {...props}
                {...register(fieldName)} // ref
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

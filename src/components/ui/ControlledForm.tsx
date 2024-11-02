"use client"

import React, { createContext, FormHTMLAttributes, useContext } from 'react';
import { useForm, UseFormRegister, FieldErrors, FieldValues, UseFormWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodSchema } from 'zod';


interface IFormContext {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    maskFunctions: Record<string, (e: React.ChangeEvent<HTMLInputElement>) => void> | undefined;
    watch: UseFormWatch<FieldValues>;
}

const FormContext = createContext<IFormContext | null>(null);

export const useControlledFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
};


interface IForm<T> extends FormHTMLAttributes<HTMLFormElement> {
    onSubmit?: () => void;
    onChange?: (data: FieldValues) => void;
    children: React.ReactNode;
    zodSchema?: ZodSchema<T>;
    maskFunctions?: Record<string, (e: React.ChangeEvent<HTMLInputElement>) => void> | undefined;
}

export const ControlledForm = <T,>({
    onSubmit,
    onChange,
    children,
    zodSchema,
    maskFunctions,
    ...props
}: IForm<T>) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: zodSchema ? zodResolver(zodSchema) : undefined,
    });

    return (
        <FormContext.Provider value={{ register, errors, watch, maskFunctions }}>
            <form
                onSubmit={onSubmit && handleSubmit(onSubmit)}
                onChange={() => onChange && onChange(watch() as FieldValues)}
                autoComplete={props?.autoComplete || "off"}
                {...props}
            >
                {children}
            </form>
        </FormContext.Provider>
    );
};


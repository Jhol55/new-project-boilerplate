"use client";

import React, { createContext, Dispatch, FormHTMLAttributes, useContext, useEffect, useState } from 'react';
import { useForm, UseFormRegister, FieldErrors, FieldValues, UseFormSetError } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodSchema } from 'zod';

interface IFormContext {
    register: UseFormRegister<FieldValues>;
    setError: UseFormSetError<FieldValues>;
    errors: FieldErrors<FieldValues>;
    maskFunctions: Record<string, (e: React.ChangeEvent<HTMLInputElement>) => void> | undefined;
    form: object;
    setForm: Dispatch<React.SetStateAction<object>>;
    isSubmitting: boolean;
    isSubmitSuccessful: boolean;
}

const FormContext = createContext<IFormContext | null>(null);

export const useControlledFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useControlledFormContext must be used within a FormProvider');
    }
    return context;
};

interface IForm<T> extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
    onSubmit?: (data: FieldValues, setError: UseFormSetError<FieldValues>) => void;
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
    const { register, handleSubmit, setError, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm({
        resolver: zodSchema ? zodResolver(zodSchema) : undefined,
    });

    const [form, setForm] = useState({});

    useEffect(() => {
        if (onChange) {
            onChange(form);
            console.log(form)
        }
    }, [form, onChange]);

    return (
        <FormContext.Provider value={{ register, setError, errors, maskFunctions, form, setForm, isSubmitting, isSubmitSuccessful }}>
            <form
                {...props}
                onSubmit={onSubmit && handleSubmit(() => onSubmit(form, setError))}
                autoComplete={props.autoComplete || "on"}
            >
                {children}
            </form>
        </FormContext.Provider>
    );
};
"use client";

import React, { createContext, Dispatch, FormHTMLAttributes, forwardRef, useContext, useMemo, useState } from 'react';
import { useForm, UseFormRegister, FieldErrors, FieldValues, UseFormSetError } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodSchema } from 'zod';

interface ControlledFormContextProps {
    register: UseFormRegister<FieldValues>;
    setError: UseFormSetError<FieldValues>;
    errors: FieldErrors<FieldValues>;
    maskFunctions: Record<string, (e: React.ChangeEvent<HTMLInputElement>) => void> | undefined;
    form: object;
    setForm: Dispatch<React.SetStateAction<object>>;
    isSubmitting: boolean;
    isSubmitSuccessful: boolean;
}

const ControlledFormContext = createContext<ControlledFormContextProps | null>(null);

export const useControlledFormContext = () => {
    const context = useContext(ControlledFormContext);
    if (!context) {
        throw new Error('useControlledFormContext must be used within a FormProvider');
    }
    return context;
};

interface ControlledFormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
    onSubmit?: (data: FieldValues, setError: UseFormSetError<FieldValues>) => void;
    onChange?: (data: FieldValues) => void;
    children: React.ReactNode;
    zodSchema?: ZodSchema;
    maskFunctions?: Record<string, (e: React.ChangeEvent<HTMLInputElement>) => void> | undefined;
}

export const ControlledForm = forwardRef<HTMLFormElement, ControlledFormProps>(
    ({ onSubmit, onChange, children, zodSchema, maskFunctions, ...props}, ref) => {

    const { register, handleSubmit, setError, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm({
        resolver: zodSchema ? zodResolver(zodSchema) : undefined,
    });

    const [form, setForm] = useState({});

    useMemo(() => {
        if (onChange) {
            onChange(form);
        }
    }, [form, onChange]);

    return (
        <ControlledFormContext.Provider value={{ register, setError, errors, maskFunctions, form, setForm, isSubmitting, isSubmitSuccessful }}>
            <form
                ref={ref}
                {...props}
                onSubmit={onSubmit && handleSubmit(() => onSubmit(form, setError))}
                autoComplete={props.autoComplete || "on"}
            >
                {children}
            </form>
        </ControlledFormContext.Provider>
    );
});


ControlledForm.displayName = "ControlledForm";


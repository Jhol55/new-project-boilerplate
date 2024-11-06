"use client";

import React, { createContext, forwardRef, useContext, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ControlledFormContextProps, ControlledFormProps } from '@/types/ControlledForm.types';


const ControlledFormContext = createContext<ControlledFormContextProps | null>(null);

export const useControlledFormContext = () => {
    const context = useContext(ControlledFormContext);
    if (!context) {
        throw new Error('useControlledFormContext must be used within a FormProvider');
    }
    return context;
};


const ControlledForm = forwardRef<HTMLFormElement, ControlledFormProps>(({
    onSubmit,
    onChange,
    children,
    zodSchema,
    maskFunctions,
    ...props
}, ref) => {
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

export { ControlledForm };
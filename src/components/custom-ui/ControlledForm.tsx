"use client";

import React, { forwardRef, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ControlledFormProps } from '@/types/ControlledForm.types';
import { ControlledFormContext } from '@/contexts/ControlledFormContext';


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
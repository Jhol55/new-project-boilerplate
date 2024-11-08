"use client";

import React, { forwardRef, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ControlledFormProps } from '@/types/ControlledForm.types';
import { ControlledFormProvider } from '@/contexts/ControlledFormContext';


const ControlledForm = forwardRef<HTMLFormElement, ControlledFormProps>(({
    onSubmit,
    onChange,
    children,
    zodSchema,
    maskFunctions,
    autoComplete = "on",
    ...props
}, ref) => {
    const { register, handleSubmit, setError, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm({
        resolver: zodSchema ? zodResolver(zodSchema) : undefined,
    });

    const [form, setForm] = useState({});

    useMemo(() => {
        onChange?.(form);
    }, [form, onChange]);

    return (
        <ControlledFormProvider value={{ register, setError, errors, maskFunctions, form, setForm, isSubmitting, isSubmitSuccessful }}>
            <form
                ref={ref}
                {...props}
                onSubmit={handleSubmit(() => onSubmit?.(form, setError))}
                autoComplete={autoComplete}
            >
                {children}
            </form>
        </ControlledFormProvider>
    );
});


ControlledForm.displayName = "ControlledForm";

export { ControlledForm };
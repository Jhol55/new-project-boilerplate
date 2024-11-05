
import { Dispatch, FormHTMLAttributes } from 'react';
import { UseFormRegister, FieldErrors, FieldValues, UseFormSetError } from 'react-hook-form';
import { ZodSchema } from 'zod';

export interface ControlledFormContextProps {
    register: UseFormRegister<FieldValues>;
    setError: UseFormSetError<FieldValues>;
    errors: FieldErrors<FieldValues>;
    maskFunctions: Record<string, (e: React.ChangeEvent<HTMLInputElement>) => void> | undefined;
    form: object;
    setForm: Dispatch<React.SetStateAction<object>>;
    isSubmitting: boolean;
    isSubmitSuccessful: boolean;
}

export interface ControlledFormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
    onSubmit?: (data: FieldValues, setError: UseFormSetError<FieldValues>) => void;
    onChange?: (data: FieldValues) => void;
    children: React.ReactNode;
    zodSchema?: ZodSchema;
    maskFunctions?: Record<string, (e: React.ChangeEvent<HTMLInputElement>) => void> | undefined;
}

export interface ControlledInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "onInput"> {
    fieldName: keyof Record<string, (e: ChangeEvent<HTMLInputElement>) => void>;
    includeInForm?: boolean;
}
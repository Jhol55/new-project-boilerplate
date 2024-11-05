import { ChangeEvent, InputHTMLAttributes } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp"
import { useControlledFormContext } from "./controlled-form";

interface IFormInputOTP extends InputHTMLAttributes<HTMLInputElement> {
    fieldName: keyof Record<string, (e: ChangeEvent<HTMLInputElement>) => void>;
    length: number;
    containerClassName?: string;
    className?: string;
}

export const ControlledInputOTP = ({ fieldName, length, containerClassName, className }: IFormInputOTP) => {
    const { errors, register, setForm } = useControlledFormContext();

    return (
        <div className="w-fit mx-auto">
            <InputOTP
                containerClassName={containerClassName}
                className={className}
                maxLength={length}
                {...register(fieldName)}
                onChange={undefined}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setForm((prev) => ({
                        ...prev,
                        [fieldName]: e.target.value,
                    }));
                }}
            >
                <InputOTPGroup>
                    {Array.from({ length }, (_, index) => (
                        <InputOTPSlot
                            key={index}
                            index={index}
                            className="ring-emerald-400 text-lg"
                        />
                    ))}
                </InputOTPGroup>
            </InputOTP>
            <p className='text-red-500 min-h-6 mb-2 text-sm self-start leading-none'>{errors[fieldName]?.message as string}</p>
        </div>
    )
}
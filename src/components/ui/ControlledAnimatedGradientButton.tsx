"use client"

import { ButtonHTMLAttributes, DetailedHTMLProps, useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useControlledFormContext } from "./ControlledForm";

interface IAnimatedGradientButton extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}


export const ControlledAnimatedGradientButton = ({ children, className, ...props }: IAnimatedGradientButton) => {
    const [isLoading, setIsLoading] = useState(false);

    const { isSubmitting, isSubmitSuccessful, errors } = useControlledFormContext();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(isSubmitting || isSubmitSuccessful);        
        }, 100);

        if (Object.keys(errors).length === 0) {
            return clearTimeout(timeout);
        }
    }, [isSubmitSuccessful, isSubmitting, errors]);
    
    return (
        <button
            {...props}
            className={cn(
                "whitespace-nowrap bg-[linear-gradient(325deg,#1c9569_0%,#34d399_55%,#1c9569_90%)] bg-[280%_auto] px-6 py-2 font-medium text-white",
                "shadow-[inset_4px_4px_8px_rgba(133,190,140,0.3),inset_-4px_-4px_8px_rgba(2,58,6,0.2)] transition-[background] duration-700 hover:bg-right-top",
                className)}
        >
            <div className="flex justify-center items-center">
                {<Loader2 className={cn(isLoading ? "animate-spin": "hidden", "h-4")} />}
                {children}
            </div>
        </button>
    )
}
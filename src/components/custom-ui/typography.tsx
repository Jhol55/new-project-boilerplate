import React from "react";
import { cn } from "@/lib/utils"

interface ITypography {
    children: React.ReactNode;
    variant?: "p" | "b" | "span" | "label" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    color?: 'text-white' | 'text-black';
    className?: string;
}

interface LabelProps extends ITypography {
    variant: "label"
    htmlFor: string
}

export const Typography = ({
    className, 
    color = 'text-white', 
    variant = 'p', 
    children, 
    ...props 
} : ITypography | LabelProps) => {
    const Component = variant;

    const styles = {
        p: `text-sm font-medium`,
        b: "text-sm font-semibold",
        span: `text-md font-medium`,
        label: `text-sm font-medium w-full`,
        h1: `text-4xl font-bold`,
        h2: `text-3xl font-semi-bold`,
        h3: `text-2xl font-semibold`,
        h4: `text-xl font-medium`,
        h5: `text-lg font-medium`, 
        h6: `text-md font-medium`, 
    };

    return (
        <Component {...props} className={cn(styles[variant], color, className)}>
            {children}
        </Component>
    );
};

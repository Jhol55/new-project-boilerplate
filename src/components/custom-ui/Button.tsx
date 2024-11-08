import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { darkenColor } from "@/utils/darkenColor";
import { MultiVariantButtonProps } from "@/types/Button.types";

const Button = forwardRef<HTMLButtonElement, MultiVariantButtonProps>(({
    variant = "default",
    type = "button",
    bgHexColor,
    animated = true,
    className,
    children,
    ...props
}, ref) => {

    const animatedStyle = "transition-[background] duration-700 hover:bg-right-top";

    const defaultStyle = cn(
        "bg-[280%_auto] w-full text-white sm:text-sm md:text-md text-center font-medium cursor-pointer rounded-md py-2.5", 
        variant === "default" ? "px-2" : "px-5"
    );

    const classNames = cn(
        defaultStyle, 
        variant === "gradient" && animated && animatedStyle, 
        className
    );
    
    const darkenedBackgroundColor = darkenColor(bgHexColor, 0.22);
    const gradientBackground = `linear-gradient(325deg, ${darkenedBackgroundColor} 0%, ${bgHexColor} 55%, ${darkenedBackgroundColor} 90%)`;
    
    return (
        <button
            ref={ref}
            {...props}
            type={type}
            className={classNames}
            style={{
                backgroundImage: variant === "gradient" ? gradientBackground : undefined,
                backgroundColor: variant === "default" ? bgHexColor : undefined,
            }}     
        >
            {children}
        </button>
    )
});

Button.displayName = "Button";

export { Button };


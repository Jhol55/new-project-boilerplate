import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"
import { cn } from "@/lib/utils"

interface IAnimatedGradientButton extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}


export const AnimatedGradientButton = ({ children, className, ...props }: IAnimatedGradientButton) => {
    return (
        <button
            {...props}
            className={cn(
                "whitespace-nowrap bg-[linear-gradient(325deg,#1c9569_0%,#34d399_55%,#1c9569_90%)] bg-[280%_auto] font-medium text-white",
                "shadow-[inset_4px_4px_8px_rgba(133,190,140,0.3),inset_-4px_-4px_8px_rgba(2,58,6,0.2)] transition-[background] duration-700 hover:bg-right-top",
                "my-2 rounded-md px-5 py-2.5 text-center text-sm outline-none",
                className)}
        >
            {children}
        </button>
    )
}



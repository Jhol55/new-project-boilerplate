import { useState, forwardRef, useMemo } from "react";
import { Button } from "./Button";
import { MultiVariantButtonProps } from "@/types/Button.types";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useControlledFormContext } from "./ControlledForm";


const ControlledButton = forwardRef<HTMLButtonElement, MultiVariantButtonProps>(
    ({ type = "submit", children, ...props }, ref) => {

        const [isLoading, setIsLoading] = useState(false);
        const { isSubmitting, isSubmitSuccessful } = useControlledFormContext();

        useMemo(() => {
            const timeout = setTimeout(() => {
                setIsLoading(isSubmitting || isSubmitSuccessful);        
            }, 400);

            return () => clearTimeout(timeout);
        }, [isSubmitSuccessful, isSubmitting]);

        return (
            <Button
                ref={ref}
                type={type}
                {...props}
            >
                <div className="flex justify-center items-center">
                    <Loader2 className={cn(isLoading ? "animate-spin" : "hidden", "h-4")} />
                    {children}
                </div>
            </Button>
        );
    }
);

ControlledButton.displayName = "ControlledButton";

export { ControlledButton };

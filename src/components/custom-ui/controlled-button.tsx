import { useEffect, useState, forwardRef } from "react";
import { Button } from "./button";
import { MultiVariantButtonProps } from "@/types/button.type";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useControlledFormContext } from "./controlled-form";


const ControlledButton = forwardRef<HTMLButtonElement, MultiVariantButtonProps>(
    ({ type = "submit", children, ...props }, ref) => {

        const [isLoading, setIsLoading] = useState(false);
        const { isSubmitting, isSubmitSuccessful, errors } = useControlledFormContext();

        useEffect(() => {
            const timeout = setTimeout(() => {
                setIsLoading(isSubmitting || isSubmitSuccessful);        
            }, 400);

            return () => clearTimeout(timeout);
        }, [isSubmitSuccessful, isSubmitting, errors]);

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

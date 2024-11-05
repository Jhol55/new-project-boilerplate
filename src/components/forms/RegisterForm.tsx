import React, { useId } from "react"
import { registerFormSchema } from "@/schemas/registerForm.schema"
import { ControlledForm } from "@/components/custom-ui/ControlledForm"
import { ControlledInput } from "@/components/custom-ui/ControlledInput"
import { cn } from "@/lib/utils"
import { FieldValues, UseFormSetError } from "react-hook-form"
import { userService } from "@/services/user"
import { useRouter } from "next/navigation";
import { backgroundColor, buttonColor } from "@/constants/colors"
import { ControlledButton } from "../custom-ui/ControlledButton"
import { Typography } from "../custom-ui/Typography"
import { ControlledInputProps } from "@/types/ControlledInput.types"

export const RegisterForm = ({ className, children }: { className?: string, children?: React.ReactNode }) => {
    const baseId = useId();
    const router = useRouter();

    const inputs = [
        {
            label: "Nome de usuário",
            placeholder: "Chuck Norris",
            fieldName: "username",
            type: "text",
        },
        {
            label: "Email",
            placeholder: "sample@gmail.com",
            fieldName: "email",
            type: "text",
        },
        {
            label: "Senha",
            placeholder: "••••••••••••",
            fieldName: "password",
            type: "password",
        },
        {
            label: "Repetir Senha",
            placeholder: "••••••••••••",
            fieldName: "repeatPassword",
            type: "password",
            includeInForm: false
        },
    ];

    const handleSubmit = async (data: FieldValues, setError: UseFormSetError<FieldValues>) => {
        const response = await userService.register(data);

        if (!response.success) {
            setError("email", {
                message: "Email já cadastrado"
            });
            return;
        }

        router.push("/confirm");
    };

    return (
        <ControlledForm
            className={cn("flex flex-col gap-2 w-full h-full overflow-y-auto md:rounded-r-3xl p-4 -z-50", backgroundColor.primary, className)}
            zodSchema={registerFormSchema}
            onSubmit={handleSubmit}
        >
            <div className="h-full" /> {/* justify-center when overflow */}

            {inputs.map((input: ControlledInputProps, index) => (
                <React.Fragment key={index}>

                    <Typography variant="label" htmlFor={`${baseId}-${index}`}>
                        {input.label}
                    </Typography>

                    <ControlledInput
                        id={`${baseId}-${index}`}
                        type={input.type}
                        placeholder={input.placeholder}
                        fieldName={input.fieldName}
                        includeInForm={input.includeInForm}
                        className="w-full rounded-md border border-gray-300 bg-gray-100 p-2.5 text-black outline-none placeholder:text-black/40 focus:ring focus:ring-emerald-400 dark:border-gray-500 dark:bg-gray-300 text-sm"           
                    />
                </React.Fragment>
            ))}

            <ControlledButton
                variant="gradient"
                bgHexColor={buttonColor.primary}
            >
                Registre-se
            </ControlledButton>

            {children}

            <div className="h-full" /> {/* justify-center when overflow */}
        </ControlledForm>
    )
}

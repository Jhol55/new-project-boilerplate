import React, { useId } from "react"
import { registerFormSchema } from "@/schemas/registerForm.schema"
import { ControlledForm } from "@/components/custom-ui/ControlledForm"
import { ControlledInput } from "@/components/custom-ui/ControlledInput"
import { cn } from "@/lib/utils"
import { FieldValues, UseFormSetError } from "react-hook-form"
import { userService } from "@/services/user"
import { useRouter } from "next/navigation";
import { buttonColor } from "@/constants/colors"
import { ControlledButton } from "../custom-ui/controlled-button"


interface IRegisterForm {
    className?: string,
    children?: React.ReactNode
}

interface IInputs {
    label?: string
    placeholder?: string
    fieldName: string
    type?: string
    className?: string
    includeOnSubmit?: boolean
}

export const RegisterForm = ({ className, children }: IRegisterForm) => {
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
            includeOnSubmit: false
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
            className={cn("flex flex-col gap-2 w-full h-[90%] overflow-y-auto md:rounded-r-3xl px-4 -z-50", className)}
            zodSchema={registerFormSchema}
            onSubmit={handleSubmit}
        >
            <div className="h-full" /> {/* justify-center when overflow */}

            {inputs.map((input: IInputs, index) => (
                <React.Fragment key={index}>

                    <label htmlFor={`${baseId}-${index}`} className="w-full text-sm font-medium">
                        {input.label}
                    </label>

                    <ControlledInput
                        id={`${baseId}-${index}`}
                        type={input.type}
                        placeholder={input.placeholder}
                        fieldName={input.fieldName}
                        className="w-full rounded-md border border-gray-300 bg-gray-100 p-2.5 text-black outline-none placeholder:text-black/40 focus:ring focus:ring-emerald-400 dark:border-gray-500 dark:bg-gray-300 sm:text-sm"
                        onChange={(e, setForm) => {
                            if (input.includeOnSubmit !== false) {
                                setForm((prev) => ({
                                    ...prev,
                                    [input.fieldName]: e.target.value,
                                }));
                            }
                        }}
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

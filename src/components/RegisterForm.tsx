import { registerFormSchema } from "@/schemas/registerFormSchema"
import { ControlledForm } from "./ui/ControlledForm"
import { ControlledInput } from "./ui/ControlledInput"
import { cn } from "@/lib/utils"
import React from "react"
import { AnimatedGradientButton } from "./ui/AnimatedGradientButton"


interface IRegisterForm {
    className?: string,
    children?: React.ReactNode
}

export const RegisterForm = ({ className, children }: IRegisterForm) => {
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
        },
    ];

    return (
        <ControlledForm
            className={cn("flex flex-col gap-2 w-full h-[90%] overflow-y-auto md:rounded-r-3xl px-4 -z-50", className)}
            zodSchema={registerFormSchema}
            onSubmit={() => console.log(1)}
        >
            <div className="h-full" /> {/* justify-center when overflow */}

            {inputs.map((input, index) => (
                <React.Fragment key={index}>
                    <label key={index} htmlFor={input.fieldName} className="w-full text-sm font-medium">
                        {input.label}
                    </label>
                    <ControlledInput
                        id={input.fieldName}
                        type={input.type}
                        placeholder={input.placeholder}
                        fieldName={input.fieldName}
                        className="w-full rounded-md border border-gray-300 bg-gray-100 p-2.5 text-black outline-none placeholder:text-black/40 focus:ring focus:ring-emerald-400 dark:border-gray-500 dark:bg-gray-300 sm:text-sm"
                    />
                </React.Fragment>
            ))}

            <AnimatedGradientButton className="w-full mt-2 rounded-md px-5 py-2.5 text-center text-sm font-medium outline-none" type="submit">
                Registrar
            </AnimatedGradientButton>
            
            {children}
            
            <div className="h-full" /> {/* justify-center when overflow */}
        </ControlledForm>
    )
}
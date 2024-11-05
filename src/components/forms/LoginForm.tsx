import { ControlledForm } from "@/components/custom-ui/controlled-form"
import { ControlledInput } from "@/components/custom-ui/controlled-input"
import { cn } from "@/lib/utils"
import React, { useId } from "react"
import Link from "next/link"
import { FieldValues, UseFormSetError } from "react-hook-form"
import { userService } from "@/services/user"
import { loginFormSchema } from "@/schemas/loginForm.schema"
import { useRouter } from "next/navigation";
import { backgroundColor, buttonColor } from "@/constants/colors"
import { ControlledButton } from "../custom-ui/controlled-button"
import { Typography } from "../custom-ui/typography"

interface ILoginForm {
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

export const LoginForm = ({ className, children }: ILoginForm) => {
    const baseId = useId();
    const router = useRouter();

    const inputs = [
        {
            label: "Email",
            placeholder: "sample@gmail.com",
            fieldName: "email",
            type: "email"
        },
        {
            label: "Senha",
            placeholder: "••••••••••••",
            fieldName: "password",
            type: "password"
        },
    ]

    const handleSubmit = async (data: FieldValues, setError: UseFormSetError<FieldValues>) => {
        const response = await userService.login(data);

        if (!response.success) {
            setError("email", {
                message: "Email ou senha inválidos"
            });
            return;
        }

        router.push("/index")
    };

    return (
        <ControlledForm
            className={cn("flex flex-col gap-2 w-full h-full overflow-y-auto md:rounded-l-3xl p-4 -z-50", backgroundColor.primary, className)}
            zodSchema={loginFormSchema}
            onSubmit={handleSubmit}
        >
            <div className="h-full" /> {/* justify-center when overflow */}

            {inputs.map((input: IInputs, index) => (
                <React.Fragment key={index}>

                    <Typography variant="label" htmlFor={`${baseId}-${index}`}>
                        {input.label}
                    </Typography>

                    <ControlledInput
                        id={`${baseId}-${index}`}
                        type={input.type}
                        placeholder={input.placeholder}
                        fieldName={input.fieldName}
                        className="w-full rounded-md border border-gray-300 bg-gray-100 p-2.5 text-black outline-none placeholder:text-black/40 focus:ring focus:ring-emerald-400 dark:border-gray-500 dark:bg-gray-300 text-sm"
                    />
                </React.Fragment>
            ))}

            <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-1">
                    <ControlledInput
                        type="checkbox"
                        id={`${baseId}-${inputs.length}`}
                        fieldName="remember"
                        className="border-1 relative box-border block min-h-4 min-w-4 cursor-pointer appearance-none rounded-md border-[#d9d9d9] bg-slate-200 transition-all duration-300 before:absolute before:left-2/4 before:top-[42%] before:h-[10px] before:w-[6px] before:-translate-x-2/4 before:-translate-y-2/4 before:rotate-45 before:scale-0 before:border-b-2 before:border-r-2 before:border-solid before:border-b-white before:border-r-white before:opacity-0 before:transition-all before:delay-100 before:duration-100 before:ease-in before:content-[''] after:absolute after:inset-0 after:rounded-[7px] after:opacity-0 after:shadow-[0_0_0_calc(30px_/_2.5)_#34d399] after:transition-all after:duration-500 after:ease-in after:content-[''] checked:border-transparent checked:bg-[#34d399] checked:before:-translate-x-2/4 checked:before:-translate-y-2/4 checked:before:rotate-45 checked:before:scale-x-[1] checked:before:scale-y-[1] checked:before:opacity-100 checked:before:transition-all checked:before:delay-100 checked:before:duration-200 checked:before:ease-in hover:border-[#34d399] focus:outline-[#34d399] [&:active:not(:checked)]:after:opacity-100 [&:active:not(:checked)]:after:shadow-none [&:active:not(:checked)]:after:transition-none"
                    />
                    <Typography
                        variant="label"
                        htmlFor={`${baseId}-${inputs.length}`}
                        className="translate-y-[1px] whitespace-nowrap text-sm"
                    >
                        Lembrar de mim
                    </Typography>
                </div>
                <Link
                    href="/forget-password"
                    target="_blank"
                    className="text-sm font-medium underline"
                >
                    Esqueceu a senha?
                </Link>
            </div>

            <ControlledButton
                variant="gradient"
                bgHexColor={buttonColor.primary}
            >
                Login
            </ControlledButton>

            {children}

            <div className="h-full" /> {/* justify-center when overflow */}
        </ControlledForm>
    )
}

import { confirmEmailFormSchema } from "@/schemas/confirmEmailForm.schema"
import { ControlledAnimatedGradientButton } from "../custom-ui/ControlledAnimatedGradientButton"
import { ControlledForm } from "../custom-ui/ControlledForm"
import { ControlledInputOTP } from "../custom-ui/ControlledInputOTP"
import { FieldValues, UseFormSetError } from "react-hook-form"
import { useRouter } from "next/navigation"
import { userService } from "@/services/user"
import { useUser } from "@/hooks/useUser"


export const ConfirmEmailForm = () => {
    const router = useRouter();
    const { user } = useUser();

    const handleSumit = async (data: FieldValues, setError: UseFormSetError<FieldValues>) => {
        const response = await userService.confirmEmail({ ...data, email: user?.email })

        if (!response?.success) {
            setError("validationCode", {
                message: "Código inválido"
            })
            return;
        }

        router.push("/index");
    }

    return (
        <ControlledForm
            className="w-full px-2.5"
            zodSchema={confirmEmailFormSchema}
            onSubmit={handleSumit}
        >
            <ControlledInputOTP
                length={6}
                fieldName="validationCode"
            />
            <ControlledAnimatedGradientButton
                className="w-full rounded-md px-5 py-2.5 text-center text-sm font-medium outline-none"
                type="submit"
            >
                Confirmar
            </ControlledAnimatedGradientButton>
        </ControlledForm>
    )
}
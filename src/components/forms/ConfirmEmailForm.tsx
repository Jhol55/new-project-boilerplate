import { confirmEmailFormSchema } from "@/schemas/confirmEmailForm.schema"
import { ControlledForm } from "../custom-ui/ControlledForm"
import { ControlledInputOTP } from "../custom-ui/ControlledInputOTP"
import { FieldValues, UseFormSetError } from "react-hook-form"
import { useRouter } from "next/navigation"
import { userService } from "@/services/user"
import { useUser } from "@/hooks/useUser"
import { ControlledButton } from "../custom-ui/ControlledButton"
import { buttonColor } from "@/constants/colors"


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
            className="w-full px-4"
            zodSchema={confirmEmailFormSchema}
            onSubmit={handleSumit}
        >
            <ControlledInputOTP
                length={6}
                fieldName="validationCode"
            />
            <ControlledButton
                variant="gradient"
                bgHexColor={buttonColor.primary}
            >
                Confirmar
            </ControlledButton>
        </ControlledForm>
    )
}
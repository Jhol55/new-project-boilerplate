"use client"

import { Button } from "@/components/custom-ui/Button";
import { Container } from "@/components/custom-ui/Container";
import { Typography } from "@/components/custom-ui/Typography";
import { ConfirmEmailForm } from "@/components/forms/ConfirmEmailForm";
import { backgroundColor } from "@/constants/colors";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";


export default function Confirm() {
    const { user } = useUser();

    return (
        <Container variant="main">
            <Container variant="section" color={backgroundColor.primary} className="flex-col md:w-2/3 lg:w-1/2 xl:w-1/3">
                <Typography variant="h1">Confirmar código</Typography>
                <Typography variant="p" className="text-center px-2.5">
                    Um código de confirmação foi enviado para
                    <Typography variant="b">{" " + user?.email}</Typography>
                    . Por favor, verifique sua caixa de entrada e siga as instruções para completar o processo de registro
                </Typography>
                <ConfirmEmailForm />
                <div className="flex items-center">
                    <Typography variant="p" className="whitespace-nowrap">Não recebeu o código?</Typography>
                    <Button className="underline">Clique aqui para reenvia-lo</Button>
                </div>
            </Container>
            <Image src="/background.jpg" fill alt="" className="object-cover -z-50 opacity-40" />
        </Container>
    )
}
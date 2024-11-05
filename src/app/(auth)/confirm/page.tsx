"use client"

import { Button } from "@/components/custom-ui/button";
import { Typography } from "@/components/custom-ui/typography";
import { ConfirmEmailForm } from "@/components/forms/confirmEmailForm";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";


export default function Confirm() { //COLOCAR DIRETAMENTE O SETFORM NO CONTROLLEDINPUT ONINPUT 947648

    const { user } = useUser();

    return (
        <main className="relative flex justify-center items-center h-screen z-50">
            <section className="flex flex-col gap-8 justify-center items-center md:w-1/2 xl:w-1/3 w-[90%] h-[90%] rounded-3xl bg-zinc-900 border border-zinc-800">
                <Typography variant="h1">Confirmar código</Typography>        
                <Typography variant="p" className="text-center px-2.5">
                    Um código de confirmação foi enviado para
                    <Typography variant="b">{" " + user?.email + " "}</Typography>
                    Por favor, verifique sua caixa de entrada e siga as instruções para completar o processo de registro
                </Typography>
                <ConfirmEmailForm />
                <div className="flex items-center">
                    <Typography variant="p" className="whitespace-nowrap">Não recebeu o código?</Typography>
                    <Button className="underline">Clique aqui para reenvia-lo</Button>
                </div>
            </section>
            <Image src="/background.jpg" fill alt="" className="object-cover -z-50 opacity-40" />
        </main>

    )
}
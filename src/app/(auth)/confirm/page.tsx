"use client"

import { ConfirmEmailForm } from "@/components/forms/confirmEmailForm";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";


export default function Confirm() { //COLOCAR DIRETAMENTE O SETFORM NO CONTROLLEDINPUT ONINPUT 947648

    const { user } = useUser();

    return (
        <main className="relative flex justify-center items-center h-screen z-50">
            <section className="flex flex-col gap-8 justify-center items-center md:w-1/2 xl:w-1/3 w-[90%] h-[90%] rounded-3xl bg-zinc-900 border border-zinc-800">
                <h1 className="text-2xl font-semibold leading-none tracking-tight px-2">Confirmar código</h1>
                <p className="text-sm text-white text-center font-medium px-8">
                    Um código de confirmação foi enviado para
                    <b className="text-primary text-sm font-semibold">{" " + user?.email}</b>.
                    Por favor, verifique sua caixa de entrada e siga as instruções para completar o processo de registro
                </p>
                <ConfirmEmailForm />
                <div className="flex items-center">
                    <p className="text-sm text-white text-center font-medium">Não recebeu o código?</p>
                    <button className="text-sm font-medium ml-2 underline">Clique aqui para reenvia-lo</button>
                </div>
            </section>
            <Image src="/background.jpg" fill alt="" className="object-cover -z-50 opacity-40" />
        </main>

    )
}
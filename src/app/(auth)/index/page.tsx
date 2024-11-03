"use client"

import Image from "next/image";

export default function Index() {

    return (
        <main className="relative flex justify-center items-center h-screen z-50">
            <section className="w-1/3 h-[90%] rounded-3xl bg-zinc-900">

            </section>
            <Image src="/background.jpg" fill alt="" className="object-cover -z-50 opacity-40" />
        </main>
        
    )
}
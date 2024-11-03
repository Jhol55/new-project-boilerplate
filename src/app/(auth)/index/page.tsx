"use client"

import { api } from "@/services/api"

export default function Index() {

    const handle = async () => {
        const response = api.post("/logout")
        console.log(response)
    }

    return (
        <div onClick={handle} className="cursor-pointer border-2 h-10 z-50">ffddf</div>
    )
}
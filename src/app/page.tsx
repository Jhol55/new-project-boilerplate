"use client";

import { Button } from "@/components/custom-ui/button";
import { FlipCard } from "@/components/custom-ui/FlipCard";
import { Typography } from "@/components/custom-ui/typography";
import { LoginForm } from "@/components/forms/LoginForm";
import { RegisterForm } from "@/components/forms/RegisterForm";
import { buttonColor } from "@/constants/colors";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex justify-center items-center w-screen h-screen overflow-hidden p-10">
      <section className="flex md:w-1/2 xl:w-1/3 justify-center items-center h-screen relative">
        <LoginForm className="md:flex w-full justify-center items-center hidden bg-zinc-900 z-1 border border-r-0 border-zinc-800" />
      </section>
      <section
        className="flex md:w-1/2 xl:w-1/3 w-[90%] justify-center items-center h-screen relative"
        style={{ perspective: "1200px" }}
      >
        <FlipCard
          className="md:bg-zinc-900/90 bg-zinc-900 backdrop-blur-lg px-4"
          renderFront={(isFlipped, setIsFlipped) => (
            <>
              <LoginForm className="md:hidden flex items-center">
                <div className="flex items-center mt-2">
                  <Typography variant="span" className="whitespace-nowrap">Não tem uma conta?</Typography>
                  <Button
                    className="underline text-md px-2"
                    onClick={() => setIsFlipped(!isFlipped)}
                  >
                    Registre-se
                  </Button>
                </div>
              </LoginForm>
              <div className="md:flex md:flex-col hidden">
                <Typography variant="span" className="whitespace-nowrap">Não tem uma conta?</Typography>
                <Button
                  variant="gradient"
                  bgHexColor={buttonColor.primary}
                  onClick={() => setIsFlipped(!isFlipped)}    
                >
                  Registre-se
                </Button>
              </div>
            </>
          )}
          renderBack={(isFlipped, setIsFlipped) => (
            <>
              <RegisterForm className="md:hidden flex items-center">
                <div className="flex items-center mt-2">
                  <Typography variant="span" className="whitespace-nowrap">Já possui uma conta?</Typography>
                  <Button
                    className="underline text-md px-2"
                    onClick={() => setIsFlipped(!isFlipped)}
                  >
                    Login
                  </Button>
                </div>
              </RegisterForm>
              <div className="md:flex flex-col hidden">
                <Typography variant="span" className="whitespace-nowrap">Já possui uma conta?</Typography>
                <Button
                  variant="gradient"
                  bgHexColor={buttonColor.primary}
                  onClick={() => setIsFlipped(!isFlipped)}    
                >
                  Login
                </Button>
              </div>
            </>
          )}
        />
        <RegisterForm className="md:flex w-full items-center hidden bg-zinc-900 border border-l-0 border-zinc-800" />
      </section>
      <Image src="/background.jpg" fill alt="" className="object-cover -z-50 opacity-40" />
    </main>
  );
}

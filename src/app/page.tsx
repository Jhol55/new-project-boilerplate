"use client";

import { AnimatedGradientButton } from "@/components/ui/AnimatedGradientButton";
import { FlipCard } from "@/components/ui/FlipCard";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";

export default function Home() {
  return (
    <main className="flex justify-center items-center w-screen h-screen overflow-hidden p-10">
      <section className="flex md:w-1/2 xl:w-1/3 justify-center items-center h-screen relative">
        <LoginForm className="md:flex w-full justify-center items-center hidden bg-zinc-900 backdrop-blur-lg z-1 border border-r-0 border-zinc-800" />
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
                  <p className="text-md font-medium">Não tem uma conta?</p>
                  <button
                    className="text-md font-medium ml-2 underline"
                    type="button"
                    onClick={() => setIsFlipped(!isFlipped)}
                  >
                    Registre-se
                  </button>
                </div>
              </LoginForm>
              <div className="md:flex md:flex-col hidden">
                <h1 className="text-lg font-medium mb-2">Não tem uma conta?</h1>
                <AnimatedGradientButton
                  className="mt-2 rounded-md px-5 py-2.5 text-center text-sm font-medium outline-none"
                  type="button"
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  Registre-se
                </AnimatedGradientButton>
              </div>
            </>
          )}
          renderBack={(isFlipped, setIsFlipped) => (
            <>
              <RegisterForm className="md:hidden flex items-center">
                <div className="flex items-center mt-2">
                  <p className="text-md font-medium">Já possui uma conta?</p>
                  <button
                    className="text-md font-medium ml-2 underline"
                    type="button"
                    onClick={() => setIsFlipped(!isFlipped)}
                  >
                    Login
                  </button>
                </div>
              </RegisterForm>
              <div className="md:flex flex-col hidden">
                <h1 className="text-lg font-medium mb-2">Já possui uma conta?</h1>
                <AnimatedGradientButton
                  className="mt-2 rounded-md px-5 py-2.5 text-center text-sm font-medium outline-none"
                  type="button"
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  Login
                </AnimatedGradientButton>
              </div>
            </>
          )}
        />
        <RegisterForm className="md:flex w-full items-center hidden bg-zinc-900 backdrop-blur-lg border border-l-0 border-zinc-800" />
      </section>
    </main>
  );
}

"use client";

import { Button } from "@/components/custom-ui/Button";
import { FlipCard } from "@/components/custom-ui/FlipCard";
import { Container } from "@/components/custom-ui/Container";
import { Typography } from "@/components/custom-ui/Typography";
import { LoginForm } from "@/components/forms/LoginForm";
import { RegisterForm } from "@/components/forms/RegisterForm";
import { buttonColor } from "@/constants/colors";
import Image from "next/image";

export default function Home() {
  return (
    <Container variant="main">
      <Container variant="section" className="md:flex hidden md:w-1/2 xl:w-1/3">
        <LoginForm className="md:flex hidden z-1" />
      </Container>
      <Container variant="section" className="md:w-1/2 xl:w-1/3"
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
              <div className="md:flex md:flex-col hidden gap-2">
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
              <div className="md:flex flex-col hidden gap-2">
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
        <RegisterForm className="md:flex hidden" />
      </Container>
      <Image src="/background.jpg" fill alt="" className="object-cover -z-50 opacity-40" />
    </Container>
  );
}

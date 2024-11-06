import { ControlledFormContextProps } from "@/types/ControlledForm.types";
import { createContext } from "react";


export const ControlledFormContext = createContext<ControlledFormContextProps | null>(null);
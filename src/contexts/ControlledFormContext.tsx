import { ControlledFormContextProps } from "@/types/ControlledForm.types";
import { createContext } from "react";


export const ControlledFormContext = createContext<ControlledFormContextProps | null>(null);


export const ControlledFormProvider = ({
    children,
    value
}: { value: ControlledFormContextProps, children?: React.ReactNode }) => {
    return (
        <ControlledFormContext.Provider value={value}>
            {children}
        </ControlledFormContext.Provider>
    )
}
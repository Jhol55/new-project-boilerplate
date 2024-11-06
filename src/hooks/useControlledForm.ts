import { ControlledFormContext } from "@/contexts/ControlledFormContext";
import { useContext } from "react";


export const useControlledForm = () => {
    const context = useContext(ControlledFormContext);
    if (!context) {
        throw new Error('useControlledForm must be used within a ControlledFormProvider');
    }
    return context;
};
import { useContext } from "react";
import { UserContext } from "@/contexts/useUserContext";

export const useUser = () => useContext(UserContext)

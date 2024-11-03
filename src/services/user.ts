import { api } from "./api";
import { FieldValues } from "react-hook-form";

export class userService {

    public static async register(data: FieldValues) {
        try {
            const response = await api.post("/register", data);
            return response.data;
        } catch (error) {
            console.error("Erro ao registrar usuário", error)
        }
    }

    public static async login(data: FieldValues) {
        try {
            const response = await api.post("/login", data);
            return response.data;
        } catch (error) {
            console.error("Erro ao logar usuário", error)
        }
    }
}
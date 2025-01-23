
import { HttpResponseData } from "./HttpResponseData";

export type User = {
    cod: number;
    nome: string;
    cpf: string;
    login: string;
    senha?: string;
    is_primeiro_acesso: string;
    is_admin: number;
    is_ativo: number;
    index?: number;
}


export type SignIn = {
    accessToken: string;
    refreshToken: string;
    usuario: User;
}
export type AuthContextData = {
    user: User | null;
    signIn: ({ login, password }: { login: string, password: string }) => Promise<HttpResponseData<SignIn>>;
    signOut: () => void;
}
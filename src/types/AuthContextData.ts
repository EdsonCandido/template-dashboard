
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
export type Banner = {
    cod: number;
    titulo: string;
    descricao: string;
    arquivo: File[];
    dt_inicio: string;
    dt_fim: string;
    created_at: string;
    updated_at: string;
    is_ativo: number;
    index?: number;
}

export type Service = {
    cod: number;
    titulo: string;
    descricao: string;
    arquivo_capa: File[];
    arquivo_conteudo: File[];
    dt_inicio: string;
    dt_fim: string;
    is_ativo: number;
    created_at: string;
    updated_at: string;
    index?: number;
}
export type Noticia = {
    cod: number;
    titulo: string;
    descricao: string;
    arquivo_capa: File[];
    arquivo_conteudo: File[];
    dt_inicio: string;
    dt_fim: string;
    is_ativo: number;
    created_at: string;
    updated_at: string;
    index?: number;
}

export type CreateNewUser = {
    cod?: number;
    nome: string;
    cpf: string;
    login: string;
    senha: string;
    is_admin: number;
    is_ativo: number;
    is_primeiro_acesso?: number;
}



export type SignIn = {
    accessToken: string;
    refreshToken: string;
    usuario: User;
}
export type AuthContextData = {
    user: User | null;
    signIn: ({ login, password }: { login: string, password: string }) => Promise<HttpResponseData<SignIn>>;

    listUserAdmin: () => Promise<HttpResponseData<User[]>>;
    listBannersAdmin: () => Promise<HttpResponseData<Banner[]>>;
    validLogin: (login: string) => Promise<HttpResponseData<null>>;
    createNewUser: ({ cpf, is_admin, is_ativo, login, is_primeiro_acesso }: CreateNewUser) => Promise<HttpResponseData<null>>;
    // createNewBanner: ({ titulo, descricao, arquivo, dt_inicio, dt_fim, is_ativo }: CreateNewBanner) => Promise<HttpResponseData<null>>;
    findUser: (userId: number) => Promise<HttpResponseData<User>>
    signOut: () => void;
}
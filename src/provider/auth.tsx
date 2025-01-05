import { ReactNode, useState } from "react"
import AuthContext from "../context/auth";
import { useNavigate } from "react-router";
import { http } from "../services/http";
import { CreateNewUser } from "../types/AuthContextData";
import { toast } from "react-toastify";

type ContextProviderProps = {
    children?: ReactNode
}

const AuthProvider = ({ children }: ContextProviderProps) => {

    const navigate = useNavigate();

    const [data, setData] = useState(() => {
        const accessToken = localStorage.getItem('corpstek@accessToken');
        const refreshToken = localStorage.getItem('corpstek@refreshToken');
        const user = localStorage.getItem('corpstek@user');

        if (accessToken) {
            http.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

            return {
                accessToken,
                refreshToken,
                user: user ? JSON.parse(user) : null
            }
        }

        return {};
    })

    async function signIn({ login, password }: { login: string, password: string }) {

        const payload = {
            login,
            senha: password
        }

        const request = await http.post('/session/login', payload)
            .then(e => ({ data: e.data, success: true, error: null, message: 'OK' }))
            .catch(e => ({ data: null, success: false, error: e.response?.data, message: e.response?.data || e.message }))

        if (request.success) {
            localStorage.setItem('corpstek@accessToken', request.data.accessToken);
            localStorage.setItem('corpstek@refreshToken', request.data.refreshToken);
            localStorage.setItem('corpstek@user', JSON.stringify(request.data.usuario));


            http.defaults.headers.common['Authorization'] = `Bearer ${request.data.accessToken}`

            setData({
                accessToken: request.data.accessToken,
                refreshToken: request.data.refreshToken,
                user: request.data.usuario
            });
        }
        return request;
    }



    async function listUserAdmin() {
        const result = await http.get('/users')
            .then(e => ({ data: e.data, success: true, error: null, message: 'OK' }))
            .catch(e => ({ data: null, success: false, error: e.response?.data, message: e.response?.data || e.message }));



        return result;
    }
    async function listBannersAdmin() {
        const result = await http.get('/banners')
            .then(e => ({ data: e.data, success: true, error: null, message: 'OK' }))
            .catch(e => ({ data: null, success: false, error: e.response?.data, message: e.response?.data || e.message }));



        return result;
    }

    function signOut() {
        // console.log('signOut');
        localStorage.removeItem('corpstek@accessToken');
        localStorage.removeItem('corpstek@user');

        localStorage.clear();
        navigate('/login', { replace: true });
    }

    async function validLogin(login: string) {
        const result = await http.get('/users/login/valid', {
            params: { login: login }
        })
            .then(e => ({ data: e.data, success: true, error: null, message: 'OK' }))
            .catch(e => ({ data: null, success: false, error: e.response?.data, message: e.response?.data || e.message }));

        return result;
    }

    async function createNewUser({ cpf, is_admin, is_ativo, login, nome, senha, cod, is_primeiro_acesso }: CreateNewUser) {

        const payload = {

            cpf, is_admin, is_ativo, login, nome, senha, cod, is_primeiro_acesso
        }

        const result = await http.post('/users/', payload)
            .then(e => ({ data: e.data, success: true, error: null, message: 'OK' }))
            .catch(e => ({ data: null, success: false, error: e.response?.data, message: e.response?.data || e.message }));

        return result;
    }
    async function findUser(userId: number) {

        const result = await http.get('/users/' + userId)
            .then(e => ({ data: e.data, success: true, error: null, message: 'OK' }))
            .catch(e => ({ data: null, success: false, error: e.response?.data, message: e.response?.data || e.message }));

        return result;
    }


    async function refreshAccessToken() {
        signOut();
        toast.error('Sua sessão expirou, faça login novamente');
    }
    http.interceptors.response.use((response) => {
        return response;
    },
        async (error) => {
            const originalRequest = error.config;
            if (error.response && error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                // signOut();
                await refreshAccessToken();
                // if (newAccessToken.success) {
                //   originalRequest.headers.Authorization = `Bearer ${newAccessToken.data.accessToken}`;
                //   return api(originalRequest);
                // } else {
                //   return Promise.reject(error);
                // }
            }
            return Promise.reject(error);
        }
    );

    return (
        <AuthContext.Provider value={{ findUser, createNewUser, validLogin, user: data.user, signIn, signOut, listUserAdmin, listBannersAdmin }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider 
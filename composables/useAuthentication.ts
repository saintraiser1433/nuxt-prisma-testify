import type { DecodeJWT, refreshTokenModel } from "~/types";
import { jwtDecode } from 'jwt-decode';
export const useAuthentication = () => {
    const config = useRuntimeConfig()
    const token = localStorage.getItem('token');
    const rToken = localStorage.getItem('refreshToken');

    const signIn = async (data: User) => {
        const result = await $fetch<Token>(`${config.public.baseURL}/auth/signIn`, {
            method: "POST",
            body: {
                email: data.email,
                password: data.password,
            },
        });
        const store = storeUser();
        const decodedToken = jwtDecode<DecodeJWT>(result.token.accessToken);
        store.setUser(decodedToken);
        localStorage.setItem('token', result.token.accessToken);
        localStorage.setItem('refreshToken', result.token.refreshToken);
        return;

    }


    const signOut = async (id: string | undefined) => {
        await $fetch(`${config.public.baseURL}/auth/signOut`, {
            method: 'POST',
            body: {
                id: id
            }
        })
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    }

    const refreshToken = async () => {
        const result = await $fetch<refreshTokenModel>(`${config.public.baseURL}/auth/refresh`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${rToken}`
            }
        })
        localStorage.setItem('token', result.accessToken)
    }






    return { token, refreshToken, signIn, signOut }
}
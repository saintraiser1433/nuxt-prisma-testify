import type { DecodeJWT, refreshTokenModel } from "~/types";
import { jwtDecode } from 'jwt-decode';
export const useAuthentication = () => {
    const config = useRuntimeConfig()
    const token = ref<string | null>(localStorage.getItem('token'));



    const signIn = async (data: User) => {
        const result = await $fetch<Token>(`${config.public.baseURL}/auth/signIn`, {
            method: "POST",
            body: {
                username: data.username,
                password: data.password,
            },
        });
        const store = storeUser();
        const decodedToken = jwtDecode<DecodeJWT>(result.token.accessToken);

        store.setUser(decodedToken);
        localStorage.setItem('token', result.token.accessToken);
        localStorage.setItem('refreshToken', result.token.refreshToken);

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
        const rToken = ref<string | null>(localStorage.getItem('refreshToken'));
        const result = await $fetch<refreshTokenModel>(`${config.public.baseURL}/auth/refresh`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${rToken}`
            }
        })
        localStorage.setItem('token', result.accessToken)
    }

    const validateToken = async () => {
        const token = ref<string | null>(localStorage.getItem('token'));
        const result = await $fetch<refreshTokenModel>(`${config.public.baseURL}/auth/validate`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`
            }
        })
        return result;
    }







    return { token, refreshToken, signIn, signOut, validateToken }
}
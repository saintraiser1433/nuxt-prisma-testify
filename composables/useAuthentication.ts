import type { DecodeJWT, refreshTokenModel } from "~/types";
import { jwtDecode } from 'jwt-decode';
import { useStorage } from '@vueuse/core';
export const useAuthentication = () => {
    const config = useRuntimeConfig()
    const token = useStorage<any>('token', null);
    const rToken = useStorage<any>('refreshToken', null);
    const info = useStorage<any>('info', null);
    const signIn = async (data: User) => {
        const result = await $fetch<Token>(`${config.public.baseURL}/auth/signIn`, {
            method: "POST",
            body: {
                username: data.username,
                password: data.password,
            },
        });
        const decodedToken = jwtDecode<DecodeJWT>(result.token.accessToken);
        token.value = result.token.accessToken
        info.value = JSON.stringify(decodedToken)
        rToken.value = result.token.refreshToken
        return;
    }



    const signOut = async (id: string) => {
        await $fetch(`${config.public.baseURL}/auth/signOut`, {
            method: 'POST',
            body: {
                id: id
            }
        })
        clearAuthTokens()

    }

    const refreshToken = async () => {
        const result = await $fetch<refreshTokenModel>(`${config.public.baseURL}/auth/refresh`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${rToken.value}`
            }
        })
        token.value = result.accessToken
        return;
    }



    const clearAuthTokens = () => {
        token.value = null;
        info.value = null;
        rToken.value = null;
    };







    return { info, token, refreshToken, signIn, signOut, clearAuthTokens }
}
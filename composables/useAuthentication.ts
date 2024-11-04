import type { TokenStatus } from "~/types";


export const useAuthentication = () => {
    const config = useRuntimeConfig()
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    const data = localStorage.getItem('data')


    const signIn = async (data: User) => {
        const result: Token = await $fetch(`${config.public.baseURL}/auth/signIn`, {
            method: "POST",
            body: {
                email: data.email,
                password: data.password,
            },
        });
        localStorage.setItem('token', result.token.accessToken);
        localStorage.setItem('refreshToken', result.token.refreshToken);


    }


    const getStatus = async () => {

        const result: TokenStatus = await $fetch(`${config.public.baseURL}/auth/verifyToken`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return result;
    }

    const signOut = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        await $fetch(`${config.public.baseURL}/auth/signOut`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

    }






    return { data, token, refreshToken, signIn, signOut, getStatus }
}
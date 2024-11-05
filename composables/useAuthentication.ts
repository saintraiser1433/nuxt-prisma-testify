export const useAuthentication = () => {
    const config = useRuntimeConfig()
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');



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
        return result;



    }


    const signOut = async (id: string) => {
        await $fetch(`${config.public.baseURL}/auth/signOut`, {
            method: 'POST',
            body: {
                id: id
            }
        })
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');





    }






    return { token, refreshToken, signIn, signOut }
}
import type { Method } from "~/types";
const { token } = useAuthentication();

export const useFetchApi = async <T>(url: string, method: Method, body?: undefined): Promise<T> => {
    const requestBody = body ? JSON.stringify(body) : undefined
    return await $fetch<T>(url, {
        method,
        body: requestBody,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
}
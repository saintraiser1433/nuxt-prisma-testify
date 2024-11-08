import type { Method } from "~/types";

const token = () => localStorage.getItem('token');
export const useFetchApi = async <T, B = undefined>(url: string, method?: Method, body?: B): Promise<T> => {
    const requestBody = body ? JSON.stringify(body) : undefined
    const tokes = token();
    return await $fetch<T>(url, {
        method,
        body: requestBody,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokes}`
        },

    })

}

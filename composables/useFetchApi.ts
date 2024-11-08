import type { UseFetchOptions } from "#app";
import type { ApiResponse, Method } from "~/types";
import type { FetchError } from 'ofetch'

export const useFetchApi = async <T, B = undefined>(url: string, method?: Method, body?: B): Promise<T> => {
    const { token } = useAuthentication();
    const requestBody = body ? JSON.stringify(body) : undefined

    return await $fetch<T>(url, {
        method,
        body: requestBody,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.value}`
        },

    })

}

export const useAPI = <T>(
    url: string | (() => string),
    options?: UseFetchOptions<T>,
) => {
    return useFetch<T, FetchError<ApiResponse<T>>>(url, {
        ...options,
        $fetch: useNuxtApp().$api
    })
}

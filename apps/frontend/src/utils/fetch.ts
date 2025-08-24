'use server'

import { ApiError, ApiResponse, RequestOptions } from '@/utils/types/api.type'
import { cookies } from 'next/headers'
import { refreshAccessToken } from '@/utils/accessToken'
import { signOut } from '@/lib/authjs/auth'

let reauthenticated = false

export async function request<T>(url: string, { method, body, headers }: RequestOptions): Promise<ApiResponse<T>> {
    const cookieStore = await cookies()
    const token = cookieStore.get('accessToken')?.value

    try {
        const response = await fetch(url, {
            method,
            headers: {
                Authorization: `Bearer ${token}`,
                ...headers,
            },
            body: body ? JSON.stringify(body) : undefined,
        })

        if (response.status === 401 && !reauthenticated) {
            reauthenticated = true
            await refreshAccessToken()
            return request<T>(url, { method, body, headers })
        }

        if (reauthenticated) {
            reauthenticated = false
            await signOut()
        }

        if (!response.ok) {
            const errorResponse = (await response.json()) as ApiError
            const errorMessage = errorResponse.message
            console.error(errorResponse)
            return { result: null, error: errorMessage }
        }

        const result = await response.json()
        return { result, error: '' }
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred'
        return { result: null, error: errorMessage }
    }
}

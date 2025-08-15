'use server'

import { ApiResponse, RequestOptions } from '@/utils/types/api.type'
import { cookies } from 'next/headers'

export async function request<T>(url: string, { method, body, headers }: RequestOptions): Promise<ApiResponse<T>> {
    const cookieStore = await cookies()
    const token = cookieStore.get('accessToken')?.value

    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                ...headers,
            },
            body: body ? JSON.stringify(body) : undefined,
        })

        if (!response.ok) {
            const errorResponse = await response.json()
            const errorMessage = errorResponse.message
            return { result: null, error: errorMessage }
        }

        const result = await response.json()
        return { result, error: '' }
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred'
        return { result: null, error: errorMessage }
    }
}

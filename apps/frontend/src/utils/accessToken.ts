'use server'
import { cookies } from 'next/headers'
import { request } from '@/utils/fetch'
import { BACKEND_URL } from '@/utils/constants'

export const refreshAccessToken = async () => {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    const response = await request<{ accessToken: string }>(BACKEND_URL + '/auth/refresh', {
        method: 'POST',
        body: { accessToken: accessToken },
    })
    if (response.result) {
        cookieStore.set('accessToken', response.result.accessToken)
    }
}

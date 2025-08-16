import { BACKEND_URL } from '@/utils/constants'
import { User } from '@/utils/types/user.type'
import { request } from '@/utils/fetch'

export const getUserById = async (userId: number) => {
    return await request<User>(`${BACKEND_URL}/users/${userId}`, {
        method: 'GET',
    })
}

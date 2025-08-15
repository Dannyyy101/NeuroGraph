import { BACKEND_URL } from '@/utils/constants'
import { User } from '@/utils/types/user.type'

export const getUserById = async (userId: number) => {
    const response = await fetch(`${BACKEND_URL}/users/${userId}`, {
        method: 'GET',
    })
    return (await response.json()) as User
}

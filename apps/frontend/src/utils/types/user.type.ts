export interface User {
    id: number
    name: string
    email: string
    emailVerified: Date | null
    image: string
    password: string
}

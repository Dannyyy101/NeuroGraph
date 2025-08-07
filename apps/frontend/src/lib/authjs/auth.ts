import authConfig from '@/lib/authjs/auth.config'

import NextAuth from 'next-auth'
import { Pool } from 'pg'
import PostgresAdapter from '@auth/pg-adapter'

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

console.log(process.env.DB_HOST)

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PostgresAdapter(pool),
    session: { strategy: 'jwt' },
    ...authConfig,
})

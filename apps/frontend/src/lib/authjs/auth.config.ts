import Google from '@auth/core/providers/google'
import { NextAuthConfig } from 'next-auth'
import GitHub from '@auth/core/providers/github'
import { BACKEND_URL } from '@/utils/constants'
import { cookies } from 'next/headers'

export default {
    providers: [Google, GitHub],
    callbacks: {
        signIn: async ({ account }) => {
            const url = new URL(BACKEND_URL + '/auth/exchange')
            url.searchParams.set('provider', account?.provider || '')
            const response = await fetch(url.toString(), {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ accessToken: account?.access_token }),
                method: 'POST',
            })
            if (!response.ok) return false
            console.log(account?.access_token)
            const content = await response.json()
            const cookieStore = await cookies()
            cookieStore.set('accessToken', content.accessToken)
            return true
        },
        authorized: async ({ auth }) => {
            return !!auth
        },
        jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token
                token.provider = account.provider
            }
            return token
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string
            session.provider = token.provider as string
            return session
        },
    },
} satisfies NextAuthConfig

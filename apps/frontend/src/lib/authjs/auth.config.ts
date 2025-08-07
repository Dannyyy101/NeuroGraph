import Google from '@auth/core/providers/google'
import { NextAuthConfig } from 'next-auth'

export default {
    providers: [Google],
    callbacks: {
        authorized: async ({ auth }) => {
            return !!auth
        },
        redirect: async ({ baseUrl }) => {
            return `${baseUrl}`
        },
    },
} satisfies NextAuthConfig

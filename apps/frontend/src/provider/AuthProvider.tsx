'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { refreshAccessToken } from '@/utils/accessToken'

interface AuthContextType {
    profileImageUrl: string | undefined
    userName: string
    isAuthenticated: boolean
    userId: string
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userName, setUserName] = useState<string>('')
    const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>()
    const [userId, setUserId] = useState<string>('')
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const refreshInterval = setInterval(
            async () => {
                await refreshAccessToken()
            },
            1000 * 60 * 55
        )
        setLoading(false)
        return () => clearInterval(refreshInterval)
    }, [])

    const logout = async () => {}

    return (
        <AuthContext.Provider value={{ userName, isAuthenticated, userId, logout, profileImageUrl }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within an AuthProvider')
    return context
}

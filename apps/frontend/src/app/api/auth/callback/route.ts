import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')

    if (!code) {
        return NextResponse.json({ error: 'No code provided' }, { status: 400 })
    }

    // Exchange code for token
    const tokenRes = await fetch('https://auth.neurograph.home101.me/realms/neurograph/protocol/openid-connect/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: 'neurograph',
            client_secret: 'VS7Nnl0VjFbiuJmPoiqlZesrRaexvPvq', // only for confidential clients
            code,
            redirect_uri: 'http://192.168.178.100:3000/api/auth/callback',
        }),
    })

    const tokenData = await tokenRes.json()

    if (tokenData.error) {
        return NextResponse.json(tokenData, { status: 400 })
    }

    // Store token in HTTP-only cookie
    ;(await cookies()).set('access_token', tokenData.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: tokenData.expires_in,
        path: '/',
    })

    const redirectUrl = new URL('http://192.168.178.100:3000')
    const response = NextResponse.redirect(redirectUrl)

    // attach token to the response you're returning
    response.cookies.set('access_token', tokenData.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // in dev this will be false
        path: '/',
        maxAge: tokenData.expires_in,
        sameSite: 'lax', // 'lax' is typically fine for top-level redirects in dev
    })
    console.log(response)
    return response
}

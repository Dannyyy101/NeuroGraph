'use server'
import { DocumentHead } from '@/utils/types/DocumentHead.type'
import { BACKEND_URL } from '@/utils/constants'
import { DocumentBody } from '@/utils/types/documentBody.type'
import { cookies } from 'next/headers'
import { request } from '@/utils/fetch'

export const getAllDocuments = async (filter?: { name?: string }) => {
    const url = new URL(`${BACKEND_URL}/documents/`)

    if (filter && filter.name) {
        url.searchParams.set('name', filter.name)
    }

    const response = await request<DocumentHead[]>(url.toString(), { method: 'GET' })
    return response.result
}

export const getDocumentById = async (documentId: number): Promise<DocumentBody> => {
    const response = await fetch(`${BACKEND_URL}/documents/${documentId}`)
    return await response.json()
}

export const createNewDocument = async (title: string): Promise<number> => {
    const response = await fetch(`${BACKEND_URL}/documents/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: title, content: '' }),
    })
    return await response.json()
}

export const updateDocumentById = async (documentId: number, updatedDocument: DocumentBody) => {
    await fetch(`${BACKEND_URL}/documents/${documentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDocument),
        keepalive: true,
    })
}

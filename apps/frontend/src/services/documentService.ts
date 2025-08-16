'use server'
import { DocumentHead } from '@/utils/types/DocumentHead.type'
import { BACKEND_URL } from '@/utils/constants'
import { DocumentBody } from '@/utils/types/documentBody.type'
import { request } from '@/utils/fetch'
import { Void } from '@/utils/types/api.type'

export const getAllDocuments = async (filter?: { name?: string }) => {
    const url = new URL(`${BACKEND_URL}/documents/`)

    if (filter && filter.name) {
        url.searchParams.set('name', filter.name)
    }

    return await request<DocumentHead[]>(url.toString(), { method: 'GET' })
}

export const getDocumentById = async (documentId: number) => {
    return await request<DocumentBody>(`${BACKEND_URL}/documents/${documentId}`, { method: 'GET' })
}

export const createNewDocument = async (title: string) => {
    return await request<DocumentBody>(`${BACKEND_URL}/documents/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Prefer: 'return=representation',
        },
        body: { name: title, content: '' },
    })
}

export const updateDocumentById = async (documentId: number, updatedDocument: DocumentBody) => {
    await request<Void>(`${BACKEND_URL}/documents/${documentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDocument),
    })
}

export const deleteDocumentById = async (documentId: number) => {
    await request<Void>(`${BACKEND_URL}/documents/${documentId}`, {
        method: 'DELETE',
    })
}

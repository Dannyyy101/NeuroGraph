import { BACKEND_URL } from '@/utils/constants'
import { request } from '@/utils/fetch'
import { Deck } from '@/utils/types/deck.type'
import { Void } from '@/utils/types/api.type'

export const getAllDecks = async (filter?: { name?: string }) => {
    const url = new URL(`${BACKEND_URL}/decks`)

    if (filter && filter.name) {
        url.searchParams.set('name', filter.name)
    }

    return await request<Deck[]>(url.toString(), { method: 'GET' })
}

export const getDeckById = async (deckId: number) => {
    return await request<Deck>(`${BACKEND_URL}/decks/${deckId}`, { method: 'GET' })
}

export const addFlashcardToDeck = async (deckId: number, flashcardId: number) => {
    return await request<Void>(`${BACKEND_URL}/decks/${deckId}/flashcards/${flashcardId}`, { method: 'POST' })
}

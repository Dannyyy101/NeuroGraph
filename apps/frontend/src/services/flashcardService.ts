import { BACKEND_URL } from '@/utils/constants'
import { FlashcardPrompt } from '@/utils/types/FlashcardPrompt.type'
import { request } from '@/utils/fetch'
import { Void } from '@/utils/types/api.type'

export const generateFlashCardsByAi = async (text: string) => {
    await request<Void>(`${BACKEND_URL}/flashcards/ai`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: { prompt: text },
    })
}

export const getAllPrompts = async () => {
    return await request<FlashcardPrompt[]>(`${BACKEND_URL}/flashcards/prompts`, {
        method: 'GET',
    })
}

export const getFlashcardPromptById = async (flashcardPromptId: number) => {
    return await request<FlashcardPrompt>(`${BACKEND_URL}/flashcards/prompts/${flashcardPromptId}`, {
        method: 'GET',
    })
}

export const activateFlashcard = async (flashcardId: number) => {
    await request<Void>(`${BACKEND_URL}/flashcards/${flashcardId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: { active: true },
    })
}

export const deleteFlashcardById = async (flashcardId: number) => {
    await request<Void>(`${BACKEND_URL}/flashcards/${flashcardId}`, {
        method: 'DELETE',
    })
}

export const deleteFlashcardPromptById = async (flashcardPromptId: number) => {
    await request<Void>(`${BACKEND_URL}/flashcards/prompts/${flashcardPromptId}`, {
        method: 'DELETE',
    })
}

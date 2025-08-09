import { BACKEND_URL } from '@/utils/constants'
import { FlashcardPrompt } from '@/utils/types/FlashcardPrompt.type'

export const generateFlashCardsByAi = async (text: string) => {
    await fetch(`${BACKEND_URL}/flashcards/ai`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: text }),
    })
}

export const getAllPrompts = async () => {
    const response = await fetch(`${BACKEND_URL}/flashcards/prompts`, {
        method: 'GET',
    })
    return (await response.json()) as FlashcardPrompt[]
}

export const getFlashcardPromptById = async (flashcardPromptId: number) => {
    const response = await fetch(`${BACKEND_URL}/flashcards/prompts/${flashcardPromptId}`, {
        method: 'GET',
    })
    if (!response.ok) return null
    return (await response.json()) as FlashcardPrompt
}

export const activateFlashcard = async (flashcardId: number) => {
    await fetch(`${BACKEND_URL}/flashcards/${flashcardId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ active: true }),
    })
}

export const deleteFlashcardById = async (flashcardId: number) => {
    await fetch(`${BACKEND_URL}/flashcards/${flashcardId}`, {
        method: 'DELETE',
    })
}

export const deleteFlashcardPromptById = async (flashcardPromptId: number) => {
    await fetch(`${BACKEND_URL}/flashcards/prompts/${flashcardPromptId}`, {
        method: 'DELETE',
    })
}

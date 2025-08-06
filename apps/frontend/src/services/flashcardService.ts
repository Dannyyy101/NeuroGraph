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
    const response = await fetch(`${BACKEND_URL}/flashcards/ai`, {
        method: 'GET',
    })
    return (await response.json()) as FlashcardPrompt[]
}

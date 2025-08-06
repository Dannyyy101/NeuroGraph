import { Flashcard } from '@/utils/types/flashcard.type'

export interface FlashcardPrompt {
    flashcardPromptId: number
    prompt: string
    flashcards: Flashcard[]
    createdOn: string
}

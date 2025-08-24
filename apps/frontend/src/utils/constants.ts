import { Flashcard } from '@/utils/types/flashcard.type'

export const BACKEND_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`

export const BASE_FLASHCARD: Flashcard = {
    flashcardId: -1,
    answer: '',
    createdOn: new Date(),
    question: '',
    validated: false,
}

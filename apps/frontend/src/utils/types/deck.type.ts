import { Flashcard } from '@/utils/types/flashcard.type'

export interface Deck {
    deckId: number
    name: string
    flashcards: Flashcard[]
}

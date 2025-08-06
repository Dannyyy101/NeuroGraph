export interface Flashcard {
    id: number
    question: string
    answer: string
    createdOn: Date
    validated: boolean
}

export interface FlashcardPromt {
    id: number
    textPromt: string
    generatedFlashCards: Flashcard[]
}

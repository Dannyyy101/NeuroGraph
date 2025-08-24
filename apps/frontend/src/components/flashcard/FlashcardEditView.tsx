import { Flashcard } from '@/utils/types/flashcard.type'
import React, { useState } from 'react'
import { clsx } from 'clsx'
import { BASE_FLASHCARD } from '@/utils/constants'
import { createNewFlashcard } from '@/services/flashcardService'
import { addFlashcardToDeck } from '@/services/deckService'
import { useDeck } from '@/context/DeckProvider'
import { usePopUpClose } from '@/context/PopUpContext'

interface FlashcardViewProps {
    flashcard?: Flashcard
    deckId: number
    className?: string
}

export const FlashcardEditView: React.FC<FlashcardViewProps> = ({ flashcard, className }) => {
    const [editedFlashcard, setEditedFlashcard] = useState<Flashcard>(flashcard ? flashcard : BASE_FLASHCARD)
    const [flipped, setFlipped] = useState(false)

    const { deck, setDeck } = useDeck()
    const close = usePopUpClose()

    const defaultStyle = `w-64 h-80 [perspective:1000px] hover:cursor-pointer inset-0 transition-transform duration-700 [transform-style:preserve-3d] ${
        flipped ? '[transform:rotateY(180deg)]' : ''
    }`

    const style = clsx(className, defaultStyle)

    const handleSaveFlashcard = async () => {
        const { result } = await createNewFlashcard(editedFlashcard)

        if (deck && result) {
            await addFlashcardToDeck(deck.deckId, result.flashcardId)
            console.log([...deck.flashcards, editedFlashcard])
            setDeck({ ...deck, flashcards: [...deck.flashcards, result] })
            close()
        }
    }

    return (
        <div className="flex flex-col items-center m-4 relative">
            <div className={style}>
                {/* Front */}
                <textarea
                    onChange={(e) => setEditedFlashcard({ ...editedFlashcard, question: e.target.value })}
                    value={editedFlashcard.question}
                    className="p-4 absolute inset-0 [backface-visibility:hidden] bg-white border border-border rounded-lg flex justify-center text-xl font-bold"
                />

                {/* Back */}
                <textarea
                    onChange={(e) => setEditedFlashcard({ ...editedFlashcard, answer: e.target.value })}
                    value={editedFlashcard.answer}
                    className="p-4 absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-fg-border border border-border rounded-lg flex justify-center text-xl font-bold overflow-y-auto"
                />
            </div>
            <div className={'flex relative w-full justify-center'}>
                <button
                    onClick={handleSaveFlashcard}
                    className={
                        'hover:bg-accent hover:border-fg-accent w-28 h-10 mt-4 rounded-md bg-secondary border-fg-secondary border'
                    }
                >
                    Speichern
                </button>
                <button className={'absolute right-4 top-1/2 -translate-y-1/2'} onClick={() => setFlipped(!flipped)}>
                    <span className="material-symbols-outlined icon-size-24">360</span>
                </button>
            </div>
        </div>
    )
}

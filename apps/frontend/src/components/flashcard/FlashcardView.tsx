import { Flashcard } from '@/utils/types/flashcard.type'
import React, { useState } from 'react'
import { clsx } from 'clsx'

interface FlashcardViewProps {
    flashcard: Flashcard
    className?: string
}

export const FlashcardView: React.FC<FlashcardViewProps> = ({ flashcard, className }) => {
    const [flipped, setFlipped] = useState(false)

    const defaultStyle = `m-1 w-64 h-80 [perspective:1000px] hover:cursor-pointer inset-0 transition-transform duration-700 [transform-style:preserve-3d] ${
        flipped ? '[transform:rotateY(180deg)]' : ''
    }`

    const style = clsx(className, defaultStyle)

    return (
        <div className={style} onClick={() => setFlipped(!flipped)}>
            {/* Front */}
            <div className="p-4 absolute inset-0 [backface-visibility:hidden] bg-white border border-border rounded-lg flex justify-center text-xl font-bold">
                {flashcard.question}
            </div>

            {/* Back */}
            <div className="p-4 absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-fg-border border border-border rounded-lg flex justify-center text-xl font-bold overflow-y-auto">
                {flashcard.answer}
            </div>
        </div>
    )
}

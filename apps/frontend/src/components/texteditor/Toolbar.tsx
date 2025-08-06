import React, { useState } from 'react'
import { useClickOutside } from '@/hooks/useClickedOutside'
import { generateFlashCardsByAi } from '@/services/flashcardService'

interface ToolbarProps {
    position: { x: number; y: number }
    text: string
    close: () => void
}

export const Toolbar: React.FC<ToolbarProps> = ({ position, text, close }) => {
    const [inputValue, setInputValue] = useState<string>(text)
    const ref = useClickOutside<HTMLDivElement>(close)

    const handleGenerateFlashCards = async () => {
        await generateFlashCardsByAi(inputValue)
        close()
    }

    return (
        <div
            ref={ref}
            style={{ top: `${position.y}px`, left: `${position.x}px` }}
            className={'shadow-2xl w-96 h-10 bg-white border border-accent absolute flex items-center rounded-md'}
        >
            <span
                title="Aus dem Text eine Karteikarte generieren"
                className="material-symbols-outlined icon-size-20 ml-1"
            >
                sticky_note_2
            </span>
            <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={'w-full pl-1 focus:outline-none'}
            />
            <button onClick={handleGenerateFlashCards} className={'flex items-center mr-2'}>
                <span className="material-symbols-outlined icon-size-24 hover:text-accent">send</span>
            </button>
        </div>
    )
}

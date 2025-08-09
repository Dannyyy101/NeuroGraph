'use client'
import { useEffect, useState } from 'react'
import { FlashcardPrompt } from '@/utils/types/FlashcardPrompt.type'
import {
    activateFlashcard,
    deleteFlashcardById,
    deleteFlashcardPromptById,
    getFlashcardPromptById,
} from '@/services/flashcardService'
import { useParams, useRouter } from 'next/navigation'
import { Flashcard } from '@/utils/types/flashcard.type'

export default function Prompt() {
    const [flashcardPrompt, setFlashcardPrompt] = useState<FlashcardPrompt | null>()
    const params = useParams<{ promptId: string }>()
    const router = useRouter()

    useEffect(() => {
        const fetch = async () => {
            getFlashcardPromptById(parseInt(params.promptId)).then((item) => setFlashcardPrompt(item))
        }
        fetch()
    }, [params.promptId])

    if (!flashcardPrompt) return <div>Not found</div>

    const handleActivateFlashcard = async (flashcardId: number) => {
        await activateFlashcard(flashcardId)
        flashcardPrompt.flashcards
            .filter((card) => card.flashcardId !== flashcardId)
            .map(async (item) => await deleteFlashcardById(item.flashcardId))
        await deleteFlashcardPromptById(flashcardPrompt.flashcardPromptId)
        router.push('/flash-cards/verify')
    }

    return (
        <main className={'w-full h-screen flex flex-col items-center'}>
            <section className={'mt-32 max-w-11/12'}>
                <h2 className={'text-2xl'}>{flashcardPrompt.prompt}</h2>
            </section>

            <section className={'flex w-full mt-8 mx-10 justify-center'}>
                {flashcardPrompt.flashcards.map((flashcard) => (
                    <FlashcardView
                        key={flashcard.flashcardId + 'flashcard'}
                        flashcard={flashcard}
                        activateFlashcard={() => handleActivateFlashcard(flashcard.flashcardId)}
                    />
                ))}
            </section>
        </main>
    )
}

const FlashcardView = ({ flashcard, activateFlashcard }: { flashcard: Flashcard; activateFlashcard: () => void }) => {
    const [flipped, setFlipped] = useState(false)

    return (
        <div className="flex flex-col items-center m-4 relative w-64 h-96 [perspective:1000px] hover:cursor-pointer">
            <div
                className={`inset-0 w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
                    flipped ? '[transform:rotateY(180deg)]' : ''
                }`}
                onClick={() => setFlipped(!flipped)}
            >
                {/* Front */}
                <div className="p-4 absolute inset-0 [backface-visibility:hidden] bg-white border border-border rounded-lg flex justify-center text-xl font-bold">
                    {flashcard.question}
                </div>

                {/* Back */}
                <div className="p-4 absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-fg-border border border-border rounded-lg flex justify-center text-xl font-bold">
                    {flashcard.answer}
                </div>
            </div>
            <button
                onClick={activateFlashcard}
                className={
                    'hover:bg-accent hover:border-fg-accent w-28 h-10 mt-4 rounded-md bg-secondary border-fg-secondary border'
                }
            >
                Auswählen
            </button>
        </div>
    )
}

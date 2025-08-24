'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { getDeckById } from '@/services/deckService'
import { Deck } from '@/utils/types/deck.type'
import { FlashcardView } from '@/components/flashcard/FlashcardView'
import { clsx } from 'clsx'
import { ProgressBar } from '@/components/ProgressBar'
import { Flashcard } from '@/utils/types/flashcard.type'
import { makeTextSearchable } from '@/utils/textFunctions'
import { PopUpView } from '@/components/PopUpView'
import { BASE_FLASHCARD } from '@/utils/constants'
import { FlashcardEditView } from '@/components/flashcard/FlashcardEditView'
import { DeckProvider, useDeck } from '@/context/DeckProvider'

export default function Page() {
    const [deck, setDeck] = useState<Deck | null>(null)
    const params = useParams<{ deckId: string }>()

    useEffect(() => {
        const fetch = async () => {
            const { result } = await getDeckById(parseInt(params.deckId))
            setDeck(result)
        }
        fetch()
    }, [params.deckId])

    if (!deck) return <div>Deck not found</div>

    return (
        <main className={'w-full h-screen flex justify-center'}>
            <DeckProvider initDeck={deck}>
                <DeckPage />
            </DeckProvider>
        </main>
    )
}

const DeckPage = () => {
    const { deck, setDeck } = useDeck()
    const [searchedFlashcards, setSearchedFlashcards] = useState<Flashcard[]>(deck?.flashcards || [])
    const [userInput, setUserInput] = useState<string>('')
    const [showNewFlashcardDialog, setShowNewFlashcardDialog] = useState<boolean>(false)

    useEffect(() => {
        setSearchedFlashcards(deck?.flashcards || [])
    }, [deck])

    if (!deck) return <div>Deck not found</div>

    const handleSearchFlashcards = (input: string) => {
        setUserInput(input)
        const flashcards = deck.flashcards
        if (input.length === 0) {
            setSearchedFlashcards(flashcards)
            return
        }
        setSearchedFlashcards(
            flashcards.filter(
                (flashcard) =>
                    makeTextSearchable(flashcard.answer).includes(makeTextSearchable(input)) ||
                    makeTextSearchable(flashcard.question).includes(makeTextSearchable(input))
            )
        )
    }

    return (
        <>
            {showNewFlashcardDialog && (
                <PopUpView handlePopUpClose={() => setShowNewFlashcardDialog(false)}>
                    <FlashcardEditView flashcard={BASE_FLASHCARD} deckId={deck.deckId} />
                </PopUpView>
            )}
            <h1 className="text-4xl font-bold ml-10 absolute left-16 top-10">{deck.name}</h1>
            <div className={'mt-32 w-11/12'}>
                <section className={'lg:flex hidden'}>
                    <BatchView
                        className={'bg-bg-accent-muted'}
                        label={'Progress'}
                        information={68}
                        max={100}
                        unit={'%'}
                    />
                    <BatchView
                        className={'bg-bg-success-muted'}
                        label={'Accuracy'}
                        information={80}
                        max={100}
                        unit={'%'}
                    />
                    <BatchView className={'bg-bg-done-muted'} label={'Study Time'} information={12.5} unit={'h'} />
                    <BatchView
                        className={'bg-bg-attention-muted'}
                        label={'Flashcards'}
                        information={deck.flashcards.length}
                        unit={''}
                    />
                </section>
                <div className={'flex my-6 '}>
                    <input
                        value={userInput}
                        onChange={(e) => handleSearchFlashcards(e.target.value)}
                        className={'w-72 h-10 border border-border rounded-md pl-1'}
                        placeholder={'Search flashcards'}
                    />
                    <button
                        onClick={() => setShowNewFlashcardDialog(true)}
                        className={' ml-2 text-white bg-accent border border-fg-accent w-32 h-10 rounded-md'}
                    >
                        + Add Flashcard
                    </button>
                </div>
                <section className={'w-full flex flex-wrap'}>
                    {searchedFlashcards.map((flashcard) => (
                        <FlashcardView className={'h-32'} key={flashcard.flashcardId} flashcard={flashcard} />
                    ))}
                </section>
            </div>
        </>
    )
}

interface BatchViewProps {
    label: string
    information: number
    unit: string
    max?: number
    className?: string
}

const BatchView: React.FC<BatchViewProps> = ({ label, information, unit, max, className }) => {
    const defaultStyle = 'w-64 h-28 p-4 flex flex-col border border-border rounded-md mr-2'
    const style = clsx(className, defaultStyle)

    return (
        <div className={style}>
            <p className={'text-black'}>{label}</p>
            <h2 className={'text-xl font-bold text-black'}>
                {information}
                {unit}
            </h2>
            {max && <ProgressBar color={'white'} progress={(information * 100) / max} />}
        </div>
    )
}

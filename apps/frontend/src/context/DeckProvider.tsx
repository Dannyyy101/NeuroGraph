import React, { createContext, useContext, useState } from 'react'
import { Deck } from '@/utils/types/deck.type'

interface DeckProviderProps {
    children: React.ReactNode
    initDeck: Deck
}

interface DeckContextType {
    deck: Deck | null
    setDeck: (deck: Deck) => void
}

const DeckContext = createContext<DeckContextType | undefined>(undefined)

export const DeckProvider: React.FC<DeckProviderProps> = ({ children, initDeck }) => {
    const [deck, setDeck] = useState<Deck | null>(initDeck)

    return <DeckContext.Provider value={{ deck, setDeck }}>{children}</DeckContext.Provider>
}

export const useDeck = () => {
    const context = useContext(DeckContext)
    if (context === undefined) {
        throw new Error('useDeck must be used within an DeckProvider')
    }
    return context
}

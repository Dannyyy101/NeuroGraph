package com.neurograph.backend.services;

import com.neurograph.backend.dtos.DeckDto;

import java.util.Set;

public interface DeckService {
    DeckDto createNewDeck(DeckDto deckDto);
    Set<DeckDto> getAllDecks();
    DeckDto updateDeckById(Long deckId, DeckDto deckDto);
    DeckDto getDeckById(Long deckId);
    void deleteDeckById(Long deckId);
    void addFlashcardToDeck(Long deckId, Long FlashcardId);
}

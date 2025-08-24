package com.neurograph.backend.services;

import com.neurograph.backend.dtos.DeckDto;
import com.neurograph.backend.exceptions.ResourceNotFoundException;
import com.neurograph.backend.models.Deck;
import com.neurograph.backend.models.Flashcard;
import com.neurograph.backend.repositorys.DeckRepository;
import com.neurograph.backend.repositorys.FlashcardRepository;
import com.neurograph.backend.utils.mapper.DeckMapper;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class DeckServiceImpl implements DeckService{
    private final DeckRepository deckRepository;
    private final DeckMapper deckMapper;
    private final FlashcardRepository flashcardRepository;

    public DeckServiceImpl(DeckRepository deckRepository, DeckMapper deckMapper, FlashcardRepository flashcardRepository) {
        this.deckRepository = deckRepository;
        this.deckMapper = deckMapper;
        this.flashcardRepository = flashcardRepository;
    }

    @Override
    public DeckDto createNewDeck(DeckDto deckDto) {
        return deckMapper.toDto(deckRepository.save(deckMapper.toEntity(deckDto)));
    }

    @Override
    public Set<DeckDto> getAllDecks() {
        ArrayList<Deck> decks = (ArrayList<Deck>) deckRepository.findAll();
        return decks.stream().map((deckMapper::toDto)).collect(Collectors.toSet());
    }

    @Override
    public DeckDto updateDeckById(Long deckId, DeckDto deckDto) {
        Deck deck = deckRepository.findById(deckId).orElseThrow(() -> new ResourceNotFoundException("Deck", deckId));
        deckMapper.updateFromDto(deckDto, deck);
        return deckMapper.toDto(deckRepository.save(deck));
    }

    @Override
    public DeckDto getDeckById(Long deckId) {
        return deckMapper.toDto(deckRepository.findById(deckId).orElseThrow(() -> new ResourceNotFoundException("Deck", deckId)));
    }

    @Override
    public void deleteDeckById(Long deckId) {
        if(!deckRepository.existsById(deckId)){
            throw new ResourceNotFoundException("Deck", deckId);
        }
        deckRepository.deleteById(deckId);
    }

    @Transactional
    @Override
    public void addFlashcardToDeck(Long deckId, Long flashcardId) {
        Flashcard flashcard = flashcardRepository.findById(flashcardId).orElseThrow(() -> new ResourceNotFoundException("Flashcard", flashcardId));
        Deck deck = deckRepository.findById(deckId).orElseThrow(() -> new ResourceNotFoundException("Deck", deckId));
        flashcard.setDeck(deck);
        flashcardRepository.save(flashcard);
    }
}

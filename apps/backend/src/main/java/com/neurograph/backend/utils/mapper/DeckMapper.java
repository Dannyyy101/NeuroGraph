package com.neurograph.backend.utils.mapper;

import com.neurograph.backend.dtos.DeckDto;
import com.neurograph.backend.dtos.FlashcardDto;
import com.neurograph.backend.models.Deck;
import com.neurograph.backend.models.Flashcard;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class DeckMapper implements Mapper<Deck, DeckDto> {
    private final ModelMapper modelMapper;
    private final FlashcardMapper flashcardMapper;

    public DeckMapper(ModelMapper modelMapper, FlashcardMapper flashcardMapper) {
        this.modelMapper = modelMapper;
        this.flashcardMapper = flashcardMapper;
    }

    @Override
    public Deck toEntity(DeckDto dto) {
        return modelMapper.map(dto, Deck.class);
    }

    @Override
    public DeckDto toDto(Deck entity) {
        DeckDto deckDto = modelMapper.map(entity, DeckDto.class);
        deckDto.setFlashcards(entity.getFlashcards().stream().map((flashcardMapper::toDTO)).collect(Collectors.toSet()));
       return deckDto;
    }

    public void updateFromDto(DeckDto deckDto, Deck deck){
        if(deckDto.getName() != null) deck.setName(deckDto.getName());
    }
}

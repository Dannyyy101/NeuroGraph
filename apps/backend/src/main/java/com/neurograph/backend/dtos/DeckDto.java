package com.neurograph.backend.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class DeckDto {
    private Long deckId;
    private String name;
    private Set<FlashcardDto> flashcards = new HashSet<>();
}

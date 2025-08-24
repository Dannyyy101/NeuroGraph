package com.neurograph.backend.services;

import com.neurograph.backend.dtos.FlashcardPromptDto;
import com.neurograph.backend.dtos.FlashcardDto;

import java.util.Set;

public interface FlashcardService {
    FlashcardDto createFlashcard(FlashcardDto flashcardDTO);

    void createFlashcardWithAi(FlashcardPromptDto flashcardPromptDTO);

    Set<FlashcardDto> getAllFlashcards();

    Set<FlashcardPromptDto> getFlashCardPrompts();

    FlashcardPromptDto getFlashCardPromptById(Long flashcardPromptId);

    FlashcardDto updateFlashcardById(Long flashcardId, FlashcardDto flashcardDto);

    FlashcardDto getFlashcardById(Long flashcardId);

    FlashcardDto partialUpdateFlashcardById(Long flashcardId, FlashcardDto flashcardDto);

    void deleteFlashcardById(Long flashcardId);

    void deleteFlashcardPromptById(Long flashcardPromptId);
}

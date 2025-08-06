package com.neurograph.backend.services;

import com.neurograph.backend.dtos.ChatResponseDto;
import com.neurograph.backend.dtos.FlashcardPromptDto;
import com.neurograph.backend.dtos.FlashcardDto;
import reactor.core.publisher.Mono;

import java.util.Set;

public interface FlashcardService {
    void createFlashcard(FlashcardDto flashcardDTO);

    void createFlashcardWithAi(FlashcardPromptDto flashcardPromptDTO);

    Set<FlashcardDto> getAllFlashcards();

    Set<FlashcardPromptDto> getFlashCardPrompts();
}

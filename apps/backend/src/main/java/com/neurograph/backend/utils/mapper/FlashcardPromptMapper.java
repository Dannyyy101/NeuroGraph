package com.neurograph.backend.utils.mapper;

import com.neurograph.backend.dtos.FlashcardDto;
import com.neurograph.backend.dtos.FlashcardPromptDto;
import com.neurograph.backend.models.Flashcard;
import com.neurograph.backend.models.FlashcardPrompt;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class FlashcardPromptMapper {
    private final ModelMapper modelMapper;
    private final FlashcardMapper flashcardMapper;

    public FlashcardPromptMapper(ModelMapper modelMapper, FlashcardMapper flashcardMapper) {
        this.modelMapper = modelMapper;
        this.flashcardMapper = flashcardMapper;
    }


    public FlashcardPrompt toEntity(FlashcardPromptDto flashcardPromptDto) {
        return modelMapper.map(flashcardPromptDto, FlashcardPrompt.class);
    }

    public FlashcardPromptDto toDTO(FlashcardPrompt flashcardPrompt) {
        FlashcardPromptDto prompt = modelMapper.map(flashcardPrompt, FlashcardPromptDto.class);
        prompt.setFlashcards(flashcardPrompt.getFlashcards().stream().map(flashcardMapper::toDTO).collect(Collectors.toSet()));
        return prompt;
    }
}

package com.neurograph.backend.utils.mapper;


import com.neurograph.backend.dtos.FlashcardDto;
import com.neurograph.backend.models.Flashcard;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class FlashcardMapper {

    private final ModelMapper modelMapper;

    public FlashcardMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }


    public Flashcard toEntity(FlashcardDto flashcardDTO) {
        return modelMapper.map(flashcardDTO, Flashcard.class);
    }

    public FlashcardDto toDTO(Flashcard flashcard) {
        return modelMapper.map(flashcard, FlashcardDto.class);
    }
}

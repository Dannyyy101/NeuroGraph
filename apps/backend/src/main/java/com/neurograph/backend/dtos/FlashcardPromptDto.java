package com.neurograph.backend.dtos;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class FlashcardPromptDto {
    private Long flashcardPromptId;
    private String prompt;
    private Set<FlashcardDto> flashcards = new HashSet<>();
    private Date createdOn;
}

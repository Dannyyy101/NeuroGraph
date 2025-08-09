package com.neurograph.backend.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class FlashcardDto {
    private Long flashcardId;
    private String question;
    private String answer;
    private Boolean active;
    private Date createdOn;
}

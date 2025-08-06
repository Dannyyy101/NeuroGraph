package com.neurograph.backend.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class FlashcardDto {
    private Long flashCardId;
    private String question;
    private String answer;
    private Date createdOn;
}

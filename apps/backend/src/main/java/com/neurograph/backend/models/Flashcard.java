package com.neurograph.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "FLASHCARDS")
public class Flashcard {
    @Id
    @Column(name = "flashcard_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long flashCardId;
    @Column(columnDefinition = "TEXT")
    private String question;
    @Column(columnDefinition = "TEXT")
    private String answer;
    @Column(name = "created_on")
    private Date createdOn;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "flashcard_prompt_id", nullable = false)
    private FlashcardPrompt prompt;
}

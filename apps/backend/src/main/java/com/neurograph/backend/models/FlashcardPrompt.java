package com.neurograph.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "FLASHCARD_PROMPTS")
public class FlashcardPrompt {
    @Id
    @Column(name = "flashcard_prompt_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long flashcardPromptId;
    @Column(columnDefinition = "TEXT")
    private String prompt;
    @OneToMany(mappedBy = "prompt", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Flashcard> flashcards = new HashSet<>();
    private Date createdOn = new Date();

    public FlashcardPrompt(String prompt){
        this.prompt = prompt;
    }
}

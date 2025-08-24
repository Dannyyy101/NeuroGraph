package com.neurograph.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "DECKS")
public class Deck {

    @Id
    @Column(name = "deck_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long deckId;

    @Column
    private String name;

    @OneToMany(mappedBy = "deck")
    private Set<Flashcard> flashcards;
}

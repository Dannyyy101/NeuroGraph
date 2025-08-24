package com.neurograph.backend.controller;

import com.neurograph.backend.dtos.DeckDto;
import com.neurograph.backend.services.DeckServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;


@RequestMapping("/api/decks")
@RestController
public class DeckController {
    private final DeckServiceImpl deckServiceImpl;

    public DeckController(DeckServiceImpl deckServiceImpl) {
        this.deckServiceImpl = deckServiceImpl;
    }

    @GetMapping("")
    public ResponseEntity<Set<DeckDto>> getAllDecks() {
        return new ResponseEntity<>(deckServiceImpl.getAllDecks(), HttpStatus.OK);
    }

    @GetMapping("/{deckId}")
    public ResponseEntity<DeckDto> getDeckById(@PathVariable String deckId) {
        return new ResponseEntity<>(deckServiceImpl.getDeckById(Long.valueOf(deckId)), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Void> createNewDeck(@RequestBody DeckDto deckDto) {
        deckServiceImpl.createNewDeck(deckDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("{deckId}/flashcards/{flashcardId}")
    public ResponseEntity<Void> createNewDeck(@PathVariable String deckId, @PathVariable String flashcardId) {
        deckServiceImpl.addFlashcardToDeck(Long.valueOf(deckId), Long.valueOf(flashcardId));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/{deckId}")
    public ResponseEntity<DeckDto> updateDeckById(@RequestBody DeckDto deckDto, @PathVariable String deckId) {
        return new ResponseEntity<>(deckServiceImpl.updateDeckById(Long.valueOf(deckId), deckDto), HttpStatus.OK);
    }

    @DeleteMapping("/{deckId}")
    public ResponseEntity<Void> deleteDeckById(@PathVariable String deckId) {
        deckServiceImpl.deleteDeckById(Long.valueOf(deckId));
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}

package com.neurograph.backend.controller;

import com.neurograph.backend.dtos.ChatResponseDto;
import com.neurograph.backend.dtos.FlashcardPromptDto;
import com.neurograph.backend.dtos.FlashcardDto;
import com.neurograph.backend.services.FlashcardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Set;

@RequestMapping("/api/flashcards")
@RestController
public class FlashcardController {

    private final FlashcardService flashcardService;

    public FlashcardController(FlashcardService flashcardService) {
        this.flashcardService = flashcardService;
    }

    @PostMapping("/")
    public ResponseEntity<Long> createFlashcard(@RequestBody FlashcardDto flashcardDto) {
        flashcardService.createFlashcard(flashcardDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<Set<FlashcardDto>> getAllFlashcards() {
        return new ResponseEntity<>(flashcardService.getAllFlashcards(), HttpStatus.OK);
    }

    @PostMapping("/ai")
    public ResponseEntity<Long> createFlashcardWithAi(@RequestBody FlashcardPromptDto flashcardPromptDto) {
        flashcardService.createFlashcardWithAi(flashcardPromptDto);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @GetMapping("/ai")
    public ResponseEntity<Set<FlashcardPromptDto>> getFlashCardPrompts() {
        return new ResponseEntity<>(flashcardService.getFlashCardPrompts(), HttpStatus.OK);
    }
}

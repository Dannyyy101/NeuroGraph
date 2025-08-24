package com.neurograph.backend.controller;

import com.neurograph.backend.dtos.DocumentDto;
import com.neurograph.backend.dtos.FlashcardPromptDto;
import com.neurograph.backend.dtos.FlashcardDto;
import com.neurograph.backend.services.FlashcardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RequestMapping("/api/flashcards")
@RestController
public class FlashcardController {

    private final FlashcardService flashcardService;

    public FlashcardController(FlashcardService flashcardService) {
        this.flashcardService = flashcardService;
    }

    @PostMapping("")
    public ResponseEntity<FlashcardDto> createFlashcard(@RequestBody FlashcardDto flashcardDto, @RequestHeader("Prefer") String preferHeader) {
        FlashcardDto flashcard = flashcardService.createFlashcard(flashcardDto);
        if (preferHeader != null && preferHeader.equals("return-representation")) {
            return new ResponseEntity<>(flashcard, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("")
    public ResponseEntity<Set<FlashcardDto>> getAllFlashcards() {
        return new ResponseEntity<>(flashcardService.getAllFlashcards(), HttpStatus.OK);
    }

    @GetMapping("/{flashcardId}")
    public ResponseEntity<FlashcardDto> getFlashcardById(@PathVariable String flashcardId) {
        return new ResponseEntity<>(flashcardService.getFlashcardById(Long.valueOf(flashcardId)), HttpStatus.OK);
    }

    @DeleteMapping("/{flashcardId}")
    public ResponseEntity<Void> deleteFlashcardById(@PathVariable String flashcardId) {
        flashcardService.deleteFlashcardById(Long.valueOf(flashcardId));
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{flashcardId}")
    public ResponseEntity<FlashcardDto> partialUpdateFlashcardById(@PathVariable String flashcardId, @RequestBody FlashcardDto flashcardDto) {
        return new ResponseEntity<>(flashcardService.partialUpdateFlashcardById(Long.valueOf(flashcardId), flashcardDto), HttpStatus.OK);
    }

    @PutMapping("/{flashcardId}")
    public ResponseEntity<FlashcardDto> updateFlashcardById(@PathVariable String flashcardId, @RequestBody FlashcardDto flashcardDto) {
        return new ResponseEntity<>(flashcardService.updateFlashcardById(Long.valueOf(flashcardId), flashcardDto), HttpStatus.OK);
    }

    @PostMapping("/ai")
    public ResponseEntity<Long> createFlashcardWithAi(@RequestBody FlashcardPromptDto flashcardPromptDto) {
        flashcardService.createFlashcardWithAi(flashcardPromptDto);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @GetMapping("/prompts")
    public ResponseEntity<Set<FlashcardPromptDto>> getFlashCardPrompts() {
        return new ResponseEntity<>(flashcardService.getFlashCardPrompts(), HttpStatus.OK);
    }

    @GetMapping("/prompts/{flashcardPromptId}")
    public ResponseEntity<FlashcardPromptDto> getFlashCardPromptById(@PathVariable String flashcardPromptId) {
        return new ResponseEntity<>(flashcardService.getFlashCardPromptById(Long.valueOf(flashcardPromptId)), HttpStatus.OK);
    }

    @DeleteMapping("/prompts/{flashcardPromptId}")
    public ResponseEntity<FlashcardPromptDto> deleteFlashCardPromptById(@PathVariable String flashcardPromptId) {
        flashcardService.deleteFlashcardPromptById(Long.valueOf(flashcardPromptId));
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

package com.neurograph.backend.services;

import com.neurograph.backend.config.AiProperties;
import com.neurograph.backend.dtos.*;
import com.neurograph.backend.exceptions.ResourceNotFoundException;
import com.neurograph.backend.models.Flashcard;
import com.neurograph.backend.models.FlashcardPrompt;
import com.neurograph.backend.repositorys.FlashcardPromptRepository;
import com.neurograph.backend.repositorys.FlashcardRepository;
import com.neurograph.backend.utils.mapper.FlashcardMapper;
import com.neurograph.backend.utils.mapper.FlashcardPromptMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;
import reactor.util.retry.Retry;

import java.time.Duration;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class FlashcardServiceImpl implements FlashcardService {
    private final FlashcardRepository flashcardRepository;
    private final FlashcardMapper flashcardMapper;
    private final AiProperties aiProperties;
    private final String systemPrompt;
    private final WebClient aiWebClient;
    private final FlashcardPromptRepository flashcardPromptRepository;
    private final FlashcardPromptMapper flashcardPromptMapper;

    public FlashcardServiceImpl(FlashcardRepository flashcardRepository, FlashcardMapper flashcardMapper, AiProperties aiProperties, @Value("${ai.prompts.system}") String systemPrompt, WebClient aiWebClient, FlashcardPromptRepository flashcardPromptRepository, FlashcardPromptMapper flashcardPromptMapper) {
        this.flashcardRepository = flashcardRepository;
        this.flashcardMapper = flashcardMapper;
        this.aiProperties = aiProperties;
        this.systemPrompt = systemPrompt;
        this.aiWebClient = aiWebClient;
        this.flashcardPromptRepository = flashcardPromptRepository;
        this.flashcardPromptMapper = flashcardPromptMapper;
    }

    @Override
    public void createFlashcard(FlashcardDto flashcardDTO) {
        flashcardRepository.save(flashcardMapper.toEntity(flashcardDTO));
    }

    @Override
    public void createFlashcardWithAi(FlashcardPromptDto dto) {
        int AMOUNT_OF_CARDS_PER_PROMPT = 3;

        FlashcardPrompt flashcardPrompt = new FlashcardPrompt(dto.getPrompt());
        FlashcardPrompt savedFlashcardPrompt = flashcardPromptRepository.save(flashcardPrompt);

        List<MessageDto> msgs = List.of(
                new MessageDto("system", systemPrompt),
                new MessageDto("user", dto.getPrompt())
        );

        ChatRequestDto body = new ChatRequestDto(aiProperties.getModel(), msgs, false);

        List<Mono<ChatResponseDto>> responses = IntStream.range(0, AMOUNT_OF_CARDS_PER_PROMPT)
                .mapToObj(i -> makeAiApiCall(body))
                .toList();
        Flux<ChatResponseDto> responseFlux = Flux.merge(responses);

        responseFlux
                .flatMap(responseDto -> Mono.fromCallable(() -> {
                                    Flashcard fc = new Flashcard();
                                    String[] message = responseDto.getMessage().getContent().split(":");
                                    System.out.println(Arrays.toString(message));
                                    if(message.length != 2){
                                        return null;
                                    }

                                    String question = message[0];
                                    String answer = message[1];

                                    fc.setCreatedOn(new Date());
                                    fc.setQuestion(question);
                                    fc.setAnswer(answer);
                                    return flashcardRepository.save(fc);
                                })
                                .subscribeOn(Schedulers.boundedElastic())
                )
                .filter(Objects::nonNull)
                .collectList()
                .subscribe(flashcards -> {
                    savedFlashcardPrompt.getFlashcards().addAll(flashcards);
                    flashcardPromptRepository.save(savedFlashcardPrompt);
                });
    }

    @Override
    public Set<FlashcardDto> getAllFlashcards() {
        ArrayList<Flashcard> flashcards = (ArrayList<Flashcard>) flashcardRepository.findAll();
        return flashcards.stream().map((flashcardMapper::toDTO)).collect(Collectors.toSet());
    }

    @Override
    public Set<FlashcardPromptDto> getFlashCardPrompts() {
        ArrayList<FlashcardPrompt> flashcards = (ArrayList<FlashcardPrompt>)flashcardPromptRepository.findAll();
        return flashcards.stream().map((flashcardPromptMapper::toDTO)).collect(Collectors.toSet());
    }

    @Override
    public FlashcardPromptDto getFlashCardPromptById(Long flashcardPromptId) {
        FlashcardPrompt flashcardPrompt = flashcardPromptRepository.findById(flashcardPromptId).orElseThrow(() -> new ResourceNotFoundException("FlashcardPrompt", flashcardPromptId));
        return flashcardPromptMapper.toDTO(flashcardPrompt);
    }

    @Override
    public FlashcardDto updateFlashcardById(Long flashcardId, FlashcardDto flashcardDto) {
        // TODO CHECK IF FULL DTO WAS PROVIDED
        Flashcard entity = flashcardRepository.findById(flashcardId).orElseThrow(() -> new ResourceNotFoundException("Flashcard", flashcardId));
        flashcardMapper.updateFromDto(flashcardDto, entity);
        return flashcardMapper.toDTO(flashcardRepository.save(entity));
    }

    @Override
    public FlashcardDto getFlashcardById(Long flashcardId) {
        return flashcardMapper.toDTO(flashcardRepository.findById(flashcardId).orElseThrow(() -> new ResourceNotFoundException("Flashcard", flashcardId)));
    }

    @Override
    public FlashcardDto partialUpdateFlashcardById(Long flashcardId, FlashcardDto flashcardDto) {
        Flashcard entity = flashcardRepository.findById(flashcardId).orElseThrow(() -> new ResourceNotFoundException("Flashcard", flashcardId));
        flashcardMapper.updateFromDto(flashcardDto, entity);
        return flashcardMapper.toDTO(flashcardRepository.save(entity));
    }

    @Override
    public void deleteFlashcardById(Long flashcardId) {
        if(!flashcardRepository.existsById(flashcardId)) throw new ResourceNotFoundException("Flashcard", flashcardId);
        flashcardRepository.deleteById(flashcardId);
    }

    @Override
    public void deleteFlashcardPromptById(Long flashcardPromptId) {
        if(!flashcardPromptRepository.existsById(flashcardPromptId)) throw new ResourceNotFoundException("FlashcardPrompt", flashcardPromptId);
        flashcardPromptRepository.deleteById(flashcardPromptId);
    }

    private Mono<ChatResponseDto> makeAiApiCall(ChatRequestDto body) {
        return aiWebClient.post()
                .uri("/api/chat")
                .bodyValue(body)
                .retrieve()
                .bodyToMono(ChatResponseDto.class)
                .retryWhen(Retry.backoff(2, Duration.ofSeconds(1)));
    }
}

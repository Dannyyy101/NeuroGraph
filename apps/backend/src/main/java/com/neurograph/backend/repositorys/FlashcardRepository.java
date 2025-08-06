package com.neurograph.backend.repositorys;

import com.neurograph.backend.models.Flashcard;
import org.springframework.data.repository.CrudRepository;

public interface FlashcardRepository extends CrudRepository<Flashcard, Long> {
}

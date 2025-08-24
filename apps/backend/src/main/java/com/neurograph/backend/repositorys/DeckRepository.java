package com.neurograph.backend.repositorys;

import com.neurograph.backend.models.Deck;
import org.springframework.data.repository.CrudRepository;

public interface DeckRepository extends CrudRepository<Deck, Long> {

}

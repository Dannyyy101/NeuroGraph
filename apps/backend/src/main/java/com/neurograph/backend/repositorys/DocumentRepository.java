package com.neurograph.backend.repositorys;

import com.neurograph.backend.models.Document;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface DocumentRepository extends Neo4jRepository<Document, Long> {

}

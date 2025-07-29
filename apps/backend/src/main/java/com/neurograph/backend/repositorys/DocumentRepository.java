package com.neurograph.backend.repositorys;

import com.neurograph.backend.models.Document;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface DocumentRepository extends CrudRepository<Document, Long> {
    @Query("SELECT d FROM Document d WHERE d.documentId IN :documentIds")
    Set<Document> findAllByDocumentIds(Set<Long> documentIds);
}

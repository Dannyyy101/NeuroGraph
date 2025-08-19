package com.neurograph.backend.repositorys;

import com.neurograph.backend.models.Document;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;
import java.util.Set;

public interface DocumentRepository extends CrudRepository<Document, Long> {
    @Query("SELECT d FROM Document d WHERE d.documentId IN :documentIds")
    Set<Document> findAllByDocumentIds(Set<Long> documentIds);

    ArrayList<Document> findAllByNameContainingIgnoreCase(String name);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM DOCUMENT_LINKS WHERE document_id = :id OR linked_document_id = :id", nativeQuery = true)
    void deleteLinksByDocumentId(@Param("id") Long id);
}

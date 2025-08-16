package com.neurograph.backend.services;

import com.neurograph.backend.dtos.DocumentDto;
import com.neurograph.backend.dtos.DocumentHeadDto;
import com.neurograph.backend.models.Document;

import java.util.Set;

public interface DocumentService {
    Set<DocumentHeadDto> getAllDocumentHeads(String name);
    DocumentDto createDocument(DocumentDto document);
    void updateDocument(Long documentId, DocumentDto document);
    Set<Document> getDocumentsByIds(Set<Long> documentIds);
    Set<Long> getLinkedDocumentsFromDocument(Document document);
    DocumentDto getDocumentById(Long documentId);

    void deleteDocumentById(Long documentId);
}

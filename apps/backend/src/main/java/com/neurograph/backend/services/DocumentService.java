package com.neurograph.backend.services;

import com.neurograph.backend.dtos.DocumentDTO;
import com.neurograph.backend.dtos.DocumentHeadDTO;
import com.neurograph.backend.models.Document;

import java.util.Set;

public interface DocumentService {
    Set<DocumentHeadDTO> getAllDocumentHeads();
    void createDocument(DocumentDTO document);
    Set<Document> getDocumentsByIds(Set<Long> documentIds);
}

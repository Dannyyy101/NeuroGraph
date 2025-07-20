package com.neurograph.backend.services;

import com.neurograph.backend.dtos.DocumentDTO;
import com.neurograph.backend.dtos.DocumentHeadDTO;
import com.neurograph.backend.models.Document;
import com.neurograph.backend.repositorys.DocumentRepository;
import com.neurograph.backend.utils.mapper.DocumentMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Set;

@Service
public class DocumentServiceImpl implements DocumentService{
    private final DocumentRepository documentRepository;
    private final DocumentMapper documentMapper;

    public DocumentServiceImpl(DocumentRepository documentRepository, DocumentMapper documentMapper) {
        this.documentRepository = documentRepository;
        this.documentMapper = documentMapper;
    }

    @Override
    public Set<DocumentHeadDTO> getAllDocumentHeads() {
        ArrayList<Document> documents = (ArrayList<Document>) documentRepository.findAll();
        return documents.stream()
                .map(documentMapper::toHeadDTO)
                .collect(java.util.stream.Collectors.toSet());
    }

    @Override
    public void createDocument(DocumentDTO document) {
        Document documentEntity = documentMapper.toEntity(document, this);
        documentRepository.save(documentEntity);
    }

    @Override
    public void patchDocument(Long documentId, DocumentDTO document) {
        Document dbDocument = documentRepository.findById(documentId).orElseThrow(
                () -> new IllegalArgumentException("Document with id " + documentId + " does not exist")
        );

        if(document.getName() != null) {
            dbDocument.setName(document.getName());
        }

        if(document.getContent() != null) {
            dbDocument.setContent(document.getContent());
        }

        documentRepository.save(dbDocument);
    }

    @Override
    public Set<Document> getDocumentsByIds(Set<Long> documentIds) {
        Set<Document> documentSet = documentRepository.findAllByDocumentIds(documentIds);
        if(documentSet.size() != documentIds.size()) {
            throw new IllegalArgumentException("Some documents not found");
        }
        return documentSet;
    }

    @Override
    public Set<Long> getLinkedDocumentsFromDocument(Document document) {
        return Set.of();
    }

    @Override
    public DocumentDTO getDocumentById(Long documentId) {
        return documentMapper.toDTO( documentRepository.findById(documentId).orElseThrow(
                () -> new IllegalArgumentException("Document with id " + documentId + " does not exist")
        ));
    }

    @Override
    public void deleteDocumentById(Long documentId) {
        Document document = documentRepository.findById(documentId).orElseThrow(
                () -> new IllegalArgumentException("Document with id " + documentId + " does not exist")
        );
        documentRepository.delete(document);
    }
}

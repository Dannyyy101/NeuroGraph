package com.neurograph.backend.services;

import com.neurograph.backend.dtos.DocumentDto;
import com.neurograph.backend.dtos.DocumentHeadDto;
import com.neurograph.backend.exceptions.ResourceNotFoundException;
import com.neurograph.backend.models.Document;
import com.neurograph.backend.repositorys.DocumentRepository;
import com.neurograph.backend.utils.mapper.DocumentMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class DocumentServiceImpl implements DocumentService{
    private final DocumentRepository documentRepository;
    private final DocumentMapper documentMapper;

    public DocumentServiceImpl(DocumentRepository documentRepository, DocumentMapper documentMapper) {
        this.documentRepository = documentRepository;
        this.documentMapper = documentMapper;
    }

    @Override
    public Set<DocumentHeadDto> getAllDocumentHeads(String name) {
        ArrayList<Document> documents;
        if (name != null) {
            documents = documentRepository.findAllByNameContainingIgnoreCase(name);
        } else {
            documents = (ArrayList<Document>) documentRepository.findAll();
        }

        return documents.stream()
                .map(documentMapper::toHeadDTO)
                .collect(java.util.stream.Collectors.toSet());
    }

    @Override
    public Long createDocument(DocumentDto document) {
        Document documentEntity = documentMapper.toEntity(document, this);
        Set<Long> ids =  extractLinkedDocumentIdsFromDocumentContent(document.getContent());
        documentEntity.setLinkedDocuments(documentRepository.findAllByDocumentIds(ids));

        return documentRepository.save(documentEntity).getDocumentId();
    }

    @Override
    public void updateDocument(Long documentId, DocumentDto document) {
        documentRepository.findById(documentId).orElseThrow(
                () -> new ResourceNotFoundException("Document", documentId)
        );
        Document updatedDocument = documentMapper.toEntity(document, this);

        if(updatedDocument.getDocumentId() == null){
            updatedDocument.setDocumentId(documentId);
        }

        Set<Long> ids =  extractLinkedDocumentIdsFromDocumentContent(document.getContent());
        updatedDocument.setLinkedDocuments(documentRepository.findAllByDocumentIds(ids));

        documentRepository.save(updatedDocument);
    }

    @Override
    public Set<Document> getDocumentsByIds(Set<Long> documentIds) {
        Set<Document> documentSet = documentRepository.findAllByDocumentIds(documentIds);
        if (documentSet.size() != documentIds.size()) {
            throw new ResourceNotFoundException("Some documents could not be found");
        }
        return documentSet;
    }

    @Override
    public Set<Long> getLinkedDocumentsFromDocument(Document document) {
        return Set.of();
    }

    @Override
    public DocumentDto getDocumentById(Long documentId) {
        return documentMapper.toDTO(documentRepository.findById(documentId).orElseThrow(
                () -> new ResourceNotFoundException("Document", documentId)
        ));
    }

    @Override
    public void deleteDocumentById(Long documentId) {
        Document document = documentRepository.findById(documentId).orElseThrow(
                () -> new ResourceNotFoundException("Document", documentId)
        );
        documentRepository.delete(document);
    }

    private Set<Long> extractLinkedDocumentIdsFromDocumentContent(String content) {
        if (content == null) {
            return new HashSet<>();
        }
        // Regular expression to find [[documentId|...]] patterns
        Pattern pattern = Pattern.compile("\\[\\[(\\d+).*?]]", Pattern.MULTILINE);
        Matcher matcher = pattern.matcher(content);
        Set<Long> linkedDocumentIds = new HashSet<>();
        while (matcher.find()) {
            for (int i = 1; i <= matcher.groupCount(); i++) {
                linkedDocumentIds.add(Long.parseLong(matcher.group(i)));
            }
        }

        return linkedDocumentIds;
    }
}

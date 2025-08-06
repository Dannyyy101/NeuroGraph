package com.neurograph.backend.utils.mapper;

import com.neurograph.backend.dtos.DocumentDto;
import com.neurograph.backend.dtos.DocumentHeadDto;
import com.neurograph.backend.models.Document;
import com.neurograph.backend.services.DocumentService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class DocumentMapper {

    private final ModelMapper modelMapper;

    public DocumentMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }


    public Document toEntity(DocumentDto documentDTO, DocumentService documentService) {
        Document document = modelMapper.map(documentDTO, Document.class);
        if(documentDTO.getLinkedDocumentIds() != null) {
            Set<Document> resolvedDocuments = documentService.getDocumentsByIds(documentDTO.linkedDocumentIds);
            document.setLinkedDocuments(resolvedDocuments);
        }
        return document;
    }

    public DocumentDto toDTO(Document document) {
        return modelMapper.map(document, DocumentDto.class);
    }

    public DocumentHeadDto toHeadDTO(Document document) {
        DocumentHeadDto documentHeadDTO = modelMapper.map(document, DocumentHeadDto.class);
        documentHeadDTO.setLinkedDocumentIds(document.getLinkedDocuments().stream().map(Document::getDocumentId).collect(Collectors.toSet()));
        return documentHeadDTO;
    }
}

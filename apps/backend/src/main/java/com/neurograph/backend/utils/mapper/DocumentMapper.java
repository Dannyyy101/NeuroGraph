package com.neurograph.backend.utils.mapper;

import com.neurograph.backend.dtos.DocumentDTO;
import com.neurograph.backend.dtos.DocumentHeadDTO;
import com.neurograph.backend.models.Document;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class DocumentMapper {

    private final ModelMapper modelMapper;

    public DocumentMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }


    public Document toEntity(DocumentDTO documentDTO) {
        return modelMapper.map(documentDTO, Document.class);
    }

    public DocumentDTO toDTO(Document document) {
        DocumentDTO documentDTO = modelMapper.map(document, DocumentDTO.class);

        return documentDTO;
    }

    public DocumentHeadDTO toHeadDTO(Document document) {
        DocumentHeadDTO documentHeadDTO = modelMapper.map(document, DocumentHeadDTO.class);
        documentHeadDTO.setLinkedDocumentIds(document.getLinkedDocuments().stream().map(Document::getDocumentId).collect(Collectors.toSet()));
        return documentHeadDTO;
    }
}

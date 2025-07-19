package com.neurograph.backend.dtos;

import com.neurograph.backend.models.Document;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class DocumentDTO {
    private Long documentId;
    private String name;
    public Set<Long> linkedDocumentIds;
}

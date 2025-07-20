package com.neurograph.backend.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Setter
@Getter
public class DocumentHeadDTO {
    private String documentId;
    private String name;
    private Set<Long> linkedDocumentIds;
}

package com.neurograph.backend.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class DocumentDto {
    private Long documentId;
    private String name;
    private String content;
    public Set<Long> linkedDocumentIds;
}

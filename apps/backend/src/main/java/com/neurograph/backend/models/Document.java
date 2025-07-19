package com.neurograph.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.util.Set;

@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "DOCUMENTS")
public class Document {

    @Id
    @Column(name = "document_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long documentId;

    private String name;
    @ManyToMany
    @JoinTable(
            name = "DOCUMENT_LINKS",
            joinColumns = @JoinColumn(name = "document_id"),
            inverseJoinColumns = @JoinColumn(name = "linked_document_id"))
    Set<Document> linkedDocuments;
}

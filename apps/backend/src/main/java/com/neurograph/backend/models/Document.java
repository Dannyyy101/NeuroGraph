package com.neurograph.backend.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.Set;

@Setter
@Getter
@Node
public class Document {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    public Document(String name){
        this.name = name;
    }

    @Relationship(type = "LINKED")
    public Set<Document> teammates;


}

package com.neurograph.backend.controller;

import com.neurograph.backend.dtos.DocumentDTO;
import com.neurograph.backend.dtos.DocumentHeadDTO;
import com.neurograph.backend.models.Document;
import com.neurograph.backend.repositorys.DocumentRepository;
import com.neurograph.backend.services.DocumentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;


@RestController
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @GetMapping("/")
    public ResponseEntity<Set<DocumentHeadDTO>> index() {
        return new ResponseEntity<>(documentService.getAllDocumentHeads(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<DocumentDTO> createDocument(@RequestBody DocumentDTO document){
        documentService.createDocument(document);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
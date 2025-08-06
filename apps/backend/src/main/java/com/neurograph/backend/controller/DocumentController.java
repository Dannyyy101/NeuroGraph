package com.neurograph.backend.controller;

import com.neurograph.backend.dtos.DocumentDto;
import com.neurograph.backend.dtos.DocumentHeadDto;
import com.neurograph.backend.services.DocumentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RequestMapping("/api/documents")
@RestController
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @GetMapping("/")
    public ResponseEntity<Set<DocumentHeadDto>> getAllDocuments(@RequestParam(required = false) String name) {
        return new ResponseEntity<>(documentService.getAllDocumentHeads(name), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Long> createDocument(@RequestBody DocumentDto document){
        Long documentId = documentService.createDocument(document);
        return new ResponseEntity<>(documentId, HttpStatus.CREATED);
    }

    @GetMapping("/{documentId}")
    public ResponseEntity<DocumentDto> getDocumentById(@PathVariable Long documentId) {
        return new ResponseEntity<>(documentService.getDocumentById(documentId), HttpStatus.OK);
    }

    @PutMapping("/{documentId}")
    public ResponseEntity<DocumentDto> patchDocument(@PathVariable Long documentId, @RequestBody DocumentDto document) {
        documentService.updateDocument(documentId, document);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{documentId}")
    public ResponseEntity<DocumentDto> deleteDocument(@PathVariable Long documentId) {
        documentService.deleteDocumentById(documentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
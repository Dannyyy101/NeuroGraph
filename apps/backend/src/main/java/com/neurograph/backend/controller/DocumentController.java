package com.neurograph.backend.controller;

import com.neurograph.backend.dtos.DocumentDTO;
import com.neurograph.backend.dtos.DocumentHeadDTO;
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
    public ResponseEntity<Set<DocumentHeadDTO>> getAllDocuments(@RequestParam(required = false) String name) {
        return new ResponseEntity<>(documentService.getAllDocumentHeads(name), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Long> createDocument(@RequestBody DocumentDTO document){
        Long documentId = documentService.createDocument(document);
        return new ResponseEntity<>(documentId, HttpStatus.CREATED);
    }

    @GetMapping("/{documentId}")
    public ResponseEntity<DocumentDTO> getDocumentById(@PathVariable Long documentId) {
        return new ResponseEntity<>(documentService.getDocumentById(documentId), HttpStatus.OK);
    }

    @PutMapping("/{documentId}")
    public ResponseEntity<DocumentDTO> patchDocument(@PathVariable Long documentId, @RequestBody DocumentDTO document) {
        documentService.updateDocument(documentId, document);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{documentId}")
    public ResponseEntity<DocumentDTO> deleteDocument(@PathVariable Long documentId) {
        documentService.deleteDocumentById(documentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
package com.neurograph.backend.exceptions;

public class ResourceNotFoundException extends RuntimeException{
    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String object, Long objectId) {
        super(object + " with Id: " + objectId + " not found.");
    }

    public ResourceNotFoundException() {
        super("Resource not found");
    }
}

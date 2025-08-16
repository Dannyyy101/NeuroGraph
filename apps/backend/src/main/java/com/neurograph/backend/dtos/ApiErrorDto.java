package com.neurograph.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@Setter
public class ApiErrorDto {
    private int status;
    private String message;
    private LocalDateTime timestamp = LocalDateTime.now();

    public ApiErrorDto(int status, String message){
        this.status = status;
        this.message = message;
    }
}


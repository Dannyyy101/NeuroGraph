package com.neurograph.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
public class ChatRequestDto {
    String model;
    List<MessageDto> messages;
    boolean stream;
}

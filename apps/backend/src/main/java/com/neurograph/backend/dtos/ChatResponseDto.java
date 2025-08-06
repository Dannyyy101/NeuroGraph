package com.neurograph.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ChatResponseDto {
    String model;
    String created_at;
    MessageDto message;
    String done_reason;
    boolean done;
    long total_duration;
    long load_duration;
    int prompt_eval_count;
    long prompt_eval_duration;
    int eval_count;
    long eval_duration;
}

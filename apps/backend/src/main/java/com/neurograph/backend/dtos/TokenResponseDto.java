package com.neurograph.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class TokenResponseDto {
    String accessToken;
    String refreshToken;
}

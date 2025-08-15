package com.neurograph.backend.controller;

import com.neurograph.backend.dtos.TokenResponseDto;
import com.neurograph.backend.dtos.ExchangeBodyDto;
import com.neurograph.backend.dtos.OAuthProviderResponseDto;
import com.neurograph.backend.security.JwtUtil;
import com.neurograph.backend.utils.enums.TokenType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

@RestController
public class AuthController {

    private final JwtUtil jwtUtil;
    @Value("${auth.google.id}")
    private String googleAuthId;

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/api/auth/exchange")
    public ResponseEntity<TokenResponseDto> getString(@RequestBody ExchangeBodyDto body, @RequestParam String provider) {
        WebClient temp = WebClient.builder()
                .baseUrl("https://www.googleapis.com")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
        OAuthProviderResponseDto k = temp.post()
                .uri("/oauth2/v1/tokeninfo?access_token=" + body.getAccessToken())
                .exchangeToMono(clientResponse -> {
                    if (clientResponse.statusCode().isError()) {
                        if (clientResponse.statusCode().value() == 400) {
                            throw new RuntimeException("INVALID GOOGLE AUTH TOKEN");
                        }
                    }
                    return clientResponse.bodyToMono(OAuthProviderResponseDto.class);
                })
                .block();

        assert k != null;
        if(isGoogleAccessTokenValid(k)){
            String accessToken = jwtUtil.generateToken(k.getEmail(), TokenType.ACCESS_TOKEN);
            String refreshToken = jwtUtil.generateToken(k.getEmail(), TokenType.REFRESH_TOKEN);
            return new ResponseEntity<>(new TokenResponseDto(accessToken, refreshToken), HttpStatus.ACCEPTED);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/api/auth/refresh")
    public ResponseEntity<TokenResponseDto> post(@RequestBody ExchangeBodyDto body) {
        if(jwtUtil.validateJwtToken(body.getAccessToken())){
            String email = jwtUtil.getUsernameFromToken(body.getAccessToken());
            String accessToken = jwtUtil.generateToken(email, TokenType.ACCESS_TOKEN);
            String refreshToken = jwtUtil.generateToken(email, TokenType.REFRESH_TOKEN);
            return new ResponseEntity<>(new TokenResponseDto(accessToken, refreshToken), HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    private boolean isGoogleAccessTokenValid(OAuthProviderResponseDto token){
        return token.getIssued_to().equals(googleAuthId);
    }
}

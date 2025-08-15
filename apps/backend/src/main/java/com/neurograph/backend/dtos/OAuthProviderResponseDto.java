package com.neurograph.backend.dtos;

import lombok.Getter;

@Getter
public class OAuthProviderResponseDto {
    private String issued_to;
    private String audience;
    private String user_id;
    private String scope;
    private Integer expires_in;
    private String email;
    private Boolean verified_email;
    private String access_type;
}

package com.neurograph.backend.dtos;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UserDto {
    private Long userId;
    private String name;
    private String email;
    private LocalDate emailVerified;
    private String image;
    private String  password;
}

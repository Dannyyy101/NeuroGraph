package com.neurograph.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "USERS")
public class User {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    @Column
    private String name;
    @Column
    private String email;
    @Column(name = "email_verified")
    private LocalDate emailVerified;
    @Column
    private String image;
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private UserPassword userPassword;
}

package com.neurograph.backend.services;

import com.neurograph.backend.dtos.UserDto;

import java.util.Set;

public interface UserService {
    UserDto getUserById(Long userId);

    Set<UserDto> getAllUsers();
}

package com.neurograph.backend.services;

import com.neurograph.backend.dtos.UserDto;
import com.neurograph.backend.models.User;
import com.neurograph.backend.repositorys.UserRepository;
import com.neurograph.backend.utils.mapper.UserMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService{
    private final UserMapper userMapper;
    private final UserRepository userRepository;

    public UserServiceImpl(UserMapper userMapper, UserRepository userRepository) {
        this.userMapper = userMapper;
        this.userRepository = userRepository;
    }

    @Override
    public UserDto getUserById(Long userId) {
        return userMapper.toDto(userRepository.findById(userId).orElseThrow(() -> new RuntimeException("NOT FOUND")));
    }

    @Override
    public Set<UserDto> getAllUsers() {
        List<User> users = (List<User>) userRepository.findAll();
        return users.stream().map(userMapper::toDto).collect(Collectors.toSet());
    }
}

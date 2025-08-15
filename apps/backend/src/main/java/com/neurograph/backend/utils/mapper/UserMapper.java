package com.neurograph.backend.utils.mapper;

import com.neurograph.backend.dtos.UserDto;
import com.neurograph.backend.models.User;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class UserMapper implements Mapper<User, UserDto> {

    private final ModelMapper modelMapper;

    public UserMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public User toEntity(UserDto dto) {
        return modelMapper.map(dto, User.class);
    }

    @Override
    public UserDto toDto(User entity) {
        UserDto userDto = modelMapper.map(entity, UserDto.class);
        if(entity.getUserPassword() != null) userDto.setPassword(entity.getUserPassword().getPassword());
        return userDto;
    }
}

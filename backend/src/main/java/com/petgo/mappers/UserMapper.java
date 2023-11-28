package com.petgo.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import com.petgo.dtos.RegisterDto;
import com.petgo.dtos.UserDto;
import com.petgo.entities.User;

@Component
@Mapper(componentModel = "spring")
public interface UserMapper {

	@Mapping(target = "token", ignore = true)
    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    @Mapping(target = "id", ignore = true)
    User signUpToUser(RegisterDto signUpDto);

}

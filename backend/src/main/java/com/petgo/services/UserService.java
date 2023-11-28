package com.petgo.services;

import java.nio.CharBuffer;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.petgo.dtos.LoginDto;
import com.petgo.dtos.RegisterDto;
import com.petgo.dtos.UserDto;
import com.petgo.dtos.ModifyDto;
import com.petgo.entities.User;
import com.petgo.exceptions.AppException;
import com.petgo.mappers.UserMapper;
import com.petgo.repositories.UserRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class UserService {

	private UserRepository userRepository;
	private PasswordEncoder passwordEncoder;
	private UserMapper userMapper;
	private ModelMapper modelMapper;

	public UserDto login(LoginDto loginDto) {
		User user = userRepository.findByEmail(loginDto.email())
				.orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

		if (passwordEncoder.matches(CharBuffer.wrap(loginDto.password()), user.getPassword())) {
			return userMapper.toUserDto(user);
		}
		throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
	}

	public UserDto register(RegisterDto registerDto) {
		Optional<User> optionalUser = userRepository.findByEmail(registerDto.email());

		if (optionalUser.isPresent()) {
			throw new AppException("E-mail already exists", HttpStatus.BAD_REQUEST);
		}

		User user = userMapper.signUpToUser(registerDto);
		user.setPassword(passwordEncoder.encode(CharBuffer.wrap(registerDto.password())));
		User savedUser = userRepository.save(user);
		return userMapper.toUserDto(savedUser);
	}

	public UserDto findByEmail(String email) {
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
		return userMapper.toUserDto(user);
	}

	public ModifyDto updateUser(String email, ModifyDto updatedUserDto) {
	    Optional<User> optionalUser = userRepository.findByEmail(email);
	    
	    User existingUser = optionalUser.orElseThrow(() -> new AppException("User not found", HttpStatus.NOT_FOUND));

	    modelMapper.map(updatedUserDto, existingUser);
	    existingUser.setPassword(passwordEncoder.encode(CharBuffer.wrap(updatedUserDto.getPassword())));
	    User savedUser = userRepository.save(existingUser);
	    return modelMapper.map(savedUser, ModifyDto.class);
	}

}
package com.petgo.controllers;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.petgo.config.UserAuthenticationProvider;
import com.petgo.dtos.LoginDto;
import com.petgo.dtos.RegisterDto;
import com.petgo.dtos.UserDto;
import com.petgo.dtos.ModifyDto;
import com.petgo.services.UserService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
public class AuthController {

	private UserService userService;
	private UserAuthenticationProvider userAuthenticationProvider;

	@PostMapping("/login")
	public ResponseEntity<UserDto> login(@RequestBody @Valid LoginDto loginDto) {
		UserDto userDto = userService.login(loginDto);
		userDto.setToken(userAuthenticationProvider.createToken(userDto));
		return ResponseEntity.ok(userDto);
	}

	@PostMapping("/register")
	public ResponseEntity<UserDto> register(@RequestBody @Valid RegisterDto user) {
		UserDto createdUser = userService.register(user);
		return ResponseEntity.created(URI.create("/users/" + createdUser.getId())).body(createdUser);
	}

	@PutMapping("/{email}")
	public ResponseEntity<ModifyDto> updateUser(@PathVariable String email,
			@RequestBody @Valid ModifyDto updatedUserDto) {
		ModifyDto updatedUser = userService.updateUser(email, updatedUserDto);
		return ResponseEntity.ok(updatedUser);
	}

}

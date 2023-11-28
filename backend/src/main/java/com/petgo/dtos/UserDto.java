package com.petgo.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {

	private Long id;

	@NotBlank
	private String firstName;

	@NotBlank
	private String lastName;

	@Email
	@NotBlank
	private String email;

	private String token;

	@NotBlank
	private String password;
}

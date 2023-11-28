package com.petgo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {

	private UserAuthenticationEntryPoint userAuthenticationEntryPoint;
	private UserAuthenticationProvider userAuthenticationProvider;

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.exceptionHandling(customizer -> customizer.authenticationEntryPoint(userAuthenticationEntryPoint))
				.addFilterBefore(new JwtAuthFilter(userAuthenticationProvider), BasicAuthenticationFilter.class)
				.csrf(AbstractHttpConfigurer::disable)
				.sessionManagement(customizer -> customizer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(
						(requests) -> requests
						.requestMatchers(HttpMethod.POST, "/login", "/register").permitAll()
						.requestMatchers(HttpMethod.PUT, "/{email}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/swagger**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/swagger-ui/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/v3/api-docs/**").permitAll()
								.anyRequest().authenticated());
		return http.build();
	}
}
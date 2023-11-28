package com.petgo.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petgo.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByEmail(String email);
}

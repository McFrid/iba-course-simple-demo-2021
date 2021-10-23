package com.iba.course.demo.repository;

import com.iba.course.demo.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}

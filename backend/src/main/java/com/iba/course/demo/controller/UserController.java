package com.iba.course.demo.controller;

import com.iba.course.demo.domain.User;
import com.iba.course.demo.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getUsers() {
        List<User> users = userService.getUsers();

        return users;
    }

    @PostMapping
    public User addUser(@RequestBody User user) {
        User savedUser = userService.saveUser(user);

        return savedUser;
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}

package com.qrestaurant.qrapp.controller;

import com.qrestaurant.qrapp.model.entity.User;
import com.qrestaurant.qrapp.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/app/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, User>> me(@RequestHeader(value = "Authorization") String authorizationHeader) {
        User me = userService.getMe(authorizationHeader);

        Map<String, User> response = new HashMap<>();
        response.put("me", me);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    public ResponseEntity<Map<String, User>> deleteUser(
            @RequestHeader(value = "Authorization") String authorizationHeader) {
        User user = userService.deleteUser(authorizationHeader);

        Map<String, User> response = new HashMap<>();
        response.put("user", user);

        return ResponseEntity.ok(response);
    }
}

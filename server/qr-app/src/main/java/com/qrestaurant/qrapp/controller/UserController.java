package com.qrestaurant.qrapp.controller;

import com.qrestaurant.qrapp.common.MapperDTO;
import com.qrestaurant.qrapp.model.dto.UserDTO;
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
    private final MapperDTO mapperDTO;

    public UserController(UserService userService, MapperDTO mapperDTO) {
        this.userService = userService;
        this.mapperDTO = mapperDTO;
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, UserDTO>> me(@RequestHeader(value = "Authorization") String authorizationHeader) {
        User me = userService.getMe(authorizationHeader);

        Map<String, UserDTO> response = new HashMap<>();
        response.put("me", mapperDTO.toUserDTO(me));

        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    public ResponseEntity<Map<String, UserDTO>> deleteUser(
            @RequestHeader(value = "Authorization") String authorizationHeader) {
        User user = userService.deleteUser(authorizationHeader);

        Map<String, UserDTO> response = new HashMap<>();
        response.put("user", mapperDTO.toUserDTO(user));

        return ResponseEntity.ok(response);
    }
}

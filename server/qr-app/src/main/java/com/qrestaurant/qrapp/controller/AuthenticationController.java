package com.qrestaurant.qrapp.controller;

import com.qrestaurant.qrapp.common.MapperDTO;
import com.qrestaurant.qrapp.model.dto.UserDTO;
import com.qrestaurant.qrapp.model.request.LoginRequest;
import com.qrestaurant.qrapp.model.request.RegisterRequest;
import com.qrestaurant.qrapp.model.entity.User;
import com.qrestaurant.qrapp.service.JWTTokenService;
import com.qrestaurant.qrapp.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/app/auth")
public class AuthenticationController {
    private final UserService userService;
    private final JWTTokenService jwtTokenService;
    private final AuthenticationManager authenticationManager;
    private final MapperDTO mapperDTO;

    public AuthenticationController(UserService userService, JWTTokenService jwtTokenService,
                                    AuthenticationManager authenticationManager, MapperDTO mapperDTO) {
        this.userService = userService;
        this.jwtTokenService = jwtTokenService;
        this.authenticationManager = authenticationManager;
        this.mapperDTO = mapperDTO;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, UserDTO>> register(@Valid @RequestBody RegisterRequest registerRequest) {
        User user = userService.saveUser(new User(
                registerRequest.email(),
                registerRequest.password(),
                registerRequest.firstname(),
                registerRequest.lastname()
        ));

        Map<String, UserDTO> response = new HashMap<>();
        response.put("user", mapperDTO.toUserDTO(user));

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password()));
        String token = jwtTokenService.generateToken(authentication);

        Map<String, String> response = new HashMap<>();
        response.put("token", token);

        return ResponseEntity.ok(response);
    }
}

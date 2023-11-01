package com.qrestaurant.qrapp.controller;

import com.qrestaurant.qrapp.model.AuthRequest;
import com.qrestaurant.qrapp.model.User;
import com.qrestaurant.qrapp.service.JWTTokenService;
import com.qrestaurant.qrapp.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/app/auth")
public class AuthenticationController {
    private final UserService userService;
    private final JWTTokenService jwtTokenService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationController(UserService userService, JWTTokenService jwtTokenService,
                                    AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.jwtTokenService = jwtTokenService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody AuthRequest authRequest) {
        User user = userService.saveUser(new User(authRequest.email(), authRequest.password()));

        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(authRequest.email(), authRequest.password()));
        String token = jwtTokenService.generateToken(authentication);

        return ResponseEntity.ok(token);
    }
}

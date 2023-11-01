package com.qrestaurant.qrdashboard.controller;

import com.qrestaurant.qrdashboard.model.AuthRequest;
import com.qrestaurant.qrdashboard.service.JWTTokenService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard/auth")
public class AuthenticationController {
    private final JWTTokenService jwtTokenService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationController(JWTTokenService jwtTokenService, AuthenticationManager authenticationManager) {
        this.jwtTokenService = jwtTokenService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(authRequest.email(), authRequest.password()));
        String token = jwtTokenService.generateToken(authentication);

        return ResponseEntity.ok(token);
    }
}

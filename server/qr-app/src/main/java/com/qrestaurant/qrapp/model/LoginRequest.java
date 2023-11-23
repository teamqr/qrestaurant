package com.qrestaurant.qrapp.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @Email(message = "{email}")
        String email,
        @NotBlank(message = "{password}")
        String password
) {}

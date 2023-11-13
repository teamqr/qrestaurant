package com.qrestaurant.qrapp.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record AuthRequest(
        @Email(message = "{email}")
        String email,
        @NotBlank(message = "{password}")
        String password
) {}

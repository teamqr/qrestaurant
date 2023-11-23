package com.qrestaurant.qrapp.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @Email(message = "{email}")
        String email,
        @Min(8)
        @NotBlank(message = "{password}")
        String password
) {}

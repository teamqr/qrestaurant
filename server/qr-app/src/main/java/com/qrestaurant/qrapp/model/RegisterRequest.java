package com.qrestaurant.qrapp.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record RegisterRequest(
        @Email(message = "{email}")
        String email,
        @Min(8)
        @NotBlank(message = "{password}")
        String password,
        @NotBlank(message = "{firstname}")
        String firstname,
        @NotBlank(message = "{lastname}")
        String lastname
) {}

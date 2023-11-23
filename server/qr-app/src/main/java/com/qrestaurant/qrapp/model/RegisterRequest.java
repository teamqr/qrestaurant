package com.qrestaurant.qrapp.model;

import jakarta.validation.constraints.NotBlank;

public record RegisterRequest(
        @NotBlank(message = "{email}")
        String email,
        @NotBlank(message = "{password}")
        String password,
        @NotBlank(message = "{firstname}")
        String firstname,
        @NotBlank(message = "{lastname}")
        String lastname
) {}

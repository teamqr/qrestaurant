package com.qrestaurant.qrapp.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotNull
        @Email
        String email,
        @NotNull
        @Size(min = 8)
        String password,
        @NotNull
        String firstname,
        @NotNull
        String lastname
) {}

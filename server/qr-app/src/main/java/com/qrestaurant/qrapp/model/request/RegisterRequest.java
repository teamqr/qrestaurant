package com.qrestaurant.qrapp.model.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotNull(message = "{email.notnull}")
        @Email(message = "{email}")
        String email,
        @NotNull(message = "{password.notnull}")
        @Size(min = 8, message = "{password.size}")
        String password,
        @NotNull(message = "{firstname.notnull}")
        String firstname,
        @NotNull(message = "{lastname.notnull}")
        String lastname
) {}

package com.qrestaurant.qrdashboard.model.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record NewUserRequest(
        @NotNull
        @Email
        String email,
        @NotNull
        @Size(min = 8)
        String password
) {}

package com.qrestaurant.qrdashboard.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record NewUserRequest(
        @NotBlank(message = "{email}")
        String email,
        @NotBlank(message = "{password}")
        String password,
        @NotNull(message = "{restaurant-id}")
        Long restaurantId
) {}

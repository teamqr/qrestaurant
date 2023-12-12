package com.qrestaurant.qrdashboard.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UpdateMealCategoryRequest(
        @NotNull
        Long id,
        @NotBlank
        String name
) {}

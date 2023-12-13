package com.qrestaurant.qrdashboard.model.request;

import jakarta.validation.constraints.NotBlank;

public record NewMealCategoryRequest(
        @NotBlank
        String name
) {}

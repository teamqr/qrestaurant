package com.qrestaurant.qrdashboard.model.request;

import jakarta.validation.constraints.NotNull;

public record NewMealCategoryRequest(
        @NotNull(message = "{name.notnull}")
        String name
) {}

package com.qrestaurant.qrdashboard.model.request;

import jakarta.validation.constraints.NotNull;

public record UpdateMealCategoryRequest(
        @NotNull(message = "{id.notnull}")
        Long id,
        @NotNull(message = "{name.notnull}")
        String name
) {}

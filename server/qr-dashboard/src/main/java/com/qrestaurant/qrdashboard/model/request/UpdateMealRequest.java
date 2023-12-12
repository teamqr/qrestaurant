package com.qrestaurant.qrdashboard.model.request;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record UpdateMealRequest(
        @NotNull
        Long id,
        @NotNull
        String name,
        String description,
        @NotNull
        BigDecimal price,
        String image,
        Iterable<Long> mealCategoryIds
) {}

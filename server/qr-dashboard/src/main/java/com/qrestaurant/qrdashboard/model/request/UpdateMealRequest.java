package com.qrestaurant.qrdashboard.model.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record UpdateMealRequest(
        @NotNull(message = "{id.notnull}")
        Long id,
        @NotNull(message = "{name.notnull}")
        String name,
        String description,
        @NotNull(message = "{price.notnull}")
        @DecimalMin(value = "0.00", message = "{price.decimal.min}")
        BigDecimal price,
        String image,
        Iterable<Long> mealCategoryIds
) {}

package com.qrestaurant.qrdashboard.model.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record NewMealRequest(
        @NotNull(message = "{name.notnull}")
        String name,
        String description,
        @NotNull(message = "{price.notnull}")
        @DecimalMin(value = "0.00", message = "{price.decimal.min}")
        BigDecimal price,
        String image,
        Iterable<Long> mealCategoryIds
) {}

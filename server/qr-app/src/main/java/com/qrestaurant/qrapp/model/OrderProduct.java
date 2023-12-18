package com.qrestaurant.qrapp.model;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record OrderProduct(
        @NotNull
        Long id,
        @NotNull
        @Min(value = 1)
        Integer amount
) {}

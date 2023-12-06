package com.qrestaurant.qrdashboard.model.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record UpdateTableRequest(
        @NotNull
        Long id,
        @NotNull
        @Min(value = 1)
        Integer number
) {}

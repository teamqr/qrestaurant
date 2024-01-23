package com.qrestaurant.qrdashboard.model.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record UpdateTableRequest(
        @NotNull(message = "{id.notnull}")
        Long id,
        @NotNull(message = "{number.notnull}")
        @Min(value = 1, message = "{number.min}")
        Integer number
) {}

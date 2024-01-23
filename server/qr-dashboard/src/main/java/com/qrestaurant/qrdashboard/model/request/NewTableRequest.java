package com.qrestaurant.qrdashboard.model.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record NewTableRequest(
    @NotNull(message = "{number.notnull}")
    @Min(value = 1, message = "{number.min}")
    Integer number,
    @NotNull(message = "{prefix.notnull}")
    @Size(min = 2, max = 2, message = "{prefix.size}")
    String prefix
) {}

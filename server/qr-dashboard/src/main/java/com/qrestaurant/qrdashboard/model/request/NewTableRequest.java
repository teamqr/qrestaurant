package com.qrestaurant.qrdashboard.model.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record NewTableRequest(
    @NotNull
    @Min(value = 1)
    Integer number,
    @NotNull
    @Size(min = 2, max = 2)
    String prefix
) {}

package com.qrestaurant.qrapp.model.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record NewPaymentRequest(
        @NotNull(message = "{amount.notnull}")
        @Min(value = 1, message = "{amount.min}")
        Long amount
) {}

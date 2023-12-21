package com.qrestaurant.qrapp.model.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record NewPaymentRequest(
        @NotNull
        @Min(value = 1)
        Long amount
) {}

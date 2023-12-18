package com.qrestaurant.qrapp.model.request;

import com.qrestaurant.qrapp.model.OrderProduct;
import jakarta.validation.constraints.NotNull;

public record NewOrderRequest(
        @NotNull
        Long restaurantId,
        @NotNull
        Long tableId,
        @NotNull
        Iterable<OrderProduct> orderProducts
) {}

package com.qrestaurant.qrapp.model.request;

import com.qrestaurant.qrapp.model.OrderProduct;
import jakarta.validation.constraints.NotNull;

public record NewOrderRequest(
        @NotNull(message = "{restaurant.id.notnull}")
        Long restaurantId,
        @NotNull(message = "{table.id.notnull}")
        Long tableId,
        @NotNull(message = "{order.products.notnull}")
        Iterable<OrderProduct> orderProducts
) {}

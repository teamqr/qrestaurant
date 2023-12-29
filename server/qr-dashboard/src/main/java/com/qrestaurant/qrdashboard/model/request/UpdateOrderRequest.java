package com.qrestaurant.qrdashboard.model.request;

import com.qrestaurant.qrdashboard.common.OrderStatus;
import jakarta.validation.constraints.NotNull;

import java.util.Date;

public record UpdateOrderRequest(
        @NotNull(message = "{id.notnull}")
        Long id,
        @NotNull(message = "{status.notnull}")
        OrderStatus status,
        Date completionDate
) {}

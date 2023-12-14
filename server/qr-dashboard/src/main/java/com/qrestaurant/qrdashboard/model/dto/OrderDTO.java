package com.qrestaurant.qrdashboard.model.dto;

import com.qrestaurant.qrdashboard.common.OrderStatus;

import java.math.BigDecimal;
import java.util.Date;

public record OrderDTO(
        Long id,
        BigDecimal price,
        OrderStatus status,
        Date orderDate,
        Date completionDate,
        Long tableId,
        Long restaurantId,
        Long workerId,
        Iterable<Long> mealOrderIds
) {}

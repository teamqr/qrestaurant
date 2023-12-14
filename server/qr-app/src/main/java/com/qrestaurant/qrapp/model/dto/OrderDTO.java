package com.qrestaurant.qrapp.model.dto;

import com.qrestaurant.qrapp.common.OrderStatus;

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
        Long userId,
        Iterable<Long> mealIds
) {}

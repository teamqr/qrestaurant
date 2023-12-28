package com.qrestaurant.qrapp.model.dto;

import com.qrestaurant.qrapp.common.OrderStatus;

import java.math.BigDecimal;
import java.util.Date;

public record OrderSummaryDTO(
        Long id,
        BigDecimal price,
        OrderStatus orderStatus,
        Date orderDate,
        Date completionDate,
        Long tableId,
        Long restaurantId,
        Long userId,
        Iterable<MealSummaryDTO> meals
) {}

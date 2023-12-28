package com.qrestaurant.qrapp.model.dto;

import java.math.BigDecimal;

public record MealSummaryDTO(
        Long id,
        String name,
        String description,
        BigDecimal totalPrice,
        Integer amount
) {}

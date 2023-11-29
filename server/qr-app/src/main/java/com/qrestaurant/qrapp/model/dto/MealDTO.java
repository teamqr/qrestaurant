package com.qrestaurant.qrapp.model.dto;

import java.math.BigDecimal;

public record MealDTO(
        Long id,
        String name,
        String description,
        BigDecimal price,
        Long menuId
) {}

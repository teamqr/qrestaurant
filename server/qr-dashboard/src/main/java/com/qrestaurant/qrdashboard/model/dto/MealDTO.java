package com.qrestaurant.qrdashboard.model.dto;

import java.math.BigDecimal;

public record MealDTO(
        Long id,
        String name,
        String description,
        BigDecimal price,
        Long menuId
) {}

package com.qrestaurant.qrdashboard.model.dto;

public record MenuDTO(
        Long id,
        Long restaurantId,
        Iterable<Long> mealIds
) {}

package com.qrestaurant.qrdashboard.model.dto;

public record MealOrderDTO(
        Long id,
        Long mealId,
        Long orderId,
        Integer amount
) {}

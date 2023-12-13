package com.qrestaurant.qrapp.model.dto;

public record MealCategoryDTO(
        Long id,
        String name,
        Long restaurantId,
        Iterable<Long> mealIds
) {}

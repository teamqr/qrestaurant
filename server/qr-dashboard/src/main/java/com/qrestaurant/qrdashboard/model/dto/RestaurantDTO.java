package com.qrestaurant.qrdashboard.model.dto;

public record RestaurantDTO(
        Long id,
        String name,
        String prefix,
        String image,
        Iterable<Long> userIds,
        Long menuId,
        Iterable<Long> tableIds,
        Iterable<Long> mealCategoryIds,
        Iterable<Long> orderIds
) {}

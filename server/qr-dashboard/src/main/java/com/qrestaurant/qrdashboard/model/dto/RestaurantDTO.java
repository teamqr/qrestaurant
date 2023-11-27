package com.qrestaurant.qrdashboard.model.dto;

public record RestaurantDTO(
        Long id,
        String name,
        Iterable<Long> userIds,
        Long menuId
) {}

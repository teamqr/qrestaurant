package com.qrestaurant.qrdashboard.model.dto;

public record RestaurantDTO(
        Long id,
        String name,
        String prefix,
        Iterable<Long> userIds,
        Long menuId,
        Iterable<Long> tableIds
) {}

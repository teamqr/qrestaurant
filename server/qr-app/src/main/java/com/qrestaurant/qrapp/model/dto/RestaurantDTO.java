package com.qrestaurant.qrapp.model.dto;

public record RestaurantDTO(
        Long id,
        String name,
        String prefix,
        Long menuId,
        Iterable<Long> tableIds
) {}

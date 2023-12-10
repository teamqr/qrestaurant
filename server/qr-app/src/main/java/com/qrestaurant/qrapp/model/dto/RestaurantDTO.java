package com.qrestaurant.qrapp.model.dto;

public record RestaurantDTO(
        Long id,
        String name,
        String prefix,
        String image,
        Long menuId,
        Iterable<Long> tableIds
) {}

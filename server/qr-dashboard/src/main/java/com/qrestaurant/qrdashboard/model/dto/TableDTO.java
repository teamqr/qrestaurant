package com.qrestaurant.qrdashboard.model.dto;

public record TableDTO(
        Long id,
        Integer number,
        String code,
        Long restaurantId
) {}

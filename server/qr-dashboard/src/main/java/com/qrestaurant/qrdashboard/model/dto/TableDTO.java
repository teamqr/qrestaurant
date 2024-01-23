package com.qrestaurant.qrdashboard.model.dto;

public record TableDTO(
        Long id,
        Integer number,
        String prefix,
        String code,
        Long restaurantId,
        Iterable<Long> orderIds
) {}

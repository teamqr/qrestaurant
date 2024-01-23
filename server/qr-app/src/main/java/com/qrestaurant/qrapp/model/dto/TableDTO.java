package com.qrestaurant.qrapp.model.dto;

public record TableDTO(
        Long id,
        Integer number,
        String prefix,
        String code,
        Long restaurantId,
        Iterable<Long> orderIds
) {}

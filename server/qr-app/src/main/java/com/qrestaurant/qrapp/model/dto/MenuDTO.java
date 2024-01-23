package com.qrestaurant.qrapp.model.dto;

import java.util.List;

public record MenuDTO(
        Long id,
        Long restaurantId,
        List<Long> mealIds
) {}

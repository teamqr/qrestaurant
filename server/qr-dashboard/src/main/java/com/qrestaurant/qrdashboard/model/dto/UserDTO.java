package com.qrestaurant.qrdashboard.model.dto;

import com.qrestaurant.qrdashboard.common.Role;

public record UserDTO(
        Long id,
        String email,
        Role role,
        Long restaurantId,
        Iterable<Long> orderIds
) {}

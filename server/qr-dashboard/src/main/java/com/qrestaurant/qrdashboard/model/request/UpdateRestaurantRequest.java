package com.qrestaurant.qrdashboard.model.request;

import jakarta.validation.constraints.NotNull;

public record UpdateRestaurantRequest(
        @NotNull
        String name
) {}

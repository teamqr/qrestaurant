package com.qrestaurant.qrdashboard.model.dto;

public record OrderMealOrderDTO(
        OrderDTO orderDTO,
        Iterable<MealOrderDTO> mealOrderDTOs
) {}

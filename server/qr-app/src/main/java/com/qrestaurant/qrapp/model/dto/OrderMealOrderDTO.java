package com.qrestaurant.qrapp.model.dto;

public record OrderMealOrderDTO(
        OrderDTO orderDTO,
        Iterable<MealOrderDTO> mealOrderDTOs
) {}

package com.qrestaurant.qrapp.model.dto;

public record UserDTO(
        Long id,
        String email,
        String firstname,
        String lastname
) {}

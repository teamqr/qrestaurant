package com.qrestaurant.qrapp.model;

public record AuthRequest(
        String email,
        String password
) {}

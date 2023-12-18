package com.qrestaurant.qrdashboard.service;

import com.qrestaurant.qrdashboard.common.JWTUtil;
import com.qrestaurant.qrdashboard.model.entity.MealOrder;
import com.qrestaurant.qrdashboard.repository.MealOrderRepository;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@Service
public class MealOrderService {
    private final MealOrderRepository mealOrderRepository;
    private final JWTUtil jwtUtil;

    public MealOrderService(MealOrderRepository mealOrderRepository, JWTUtil jwtUtil) {
        this.mealOrderRepository = mealOrderRepository;
        this.jwtUtil = jwtUtil;
    }

    public Iterable<MealOrder> getAllByOrderId(String authorizationHeader, Long orderId) {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        return mealOrderRepository.getAllByOrder_IdAndOrder_Restaurant_Id(orderId, restaurantId);
    }
}

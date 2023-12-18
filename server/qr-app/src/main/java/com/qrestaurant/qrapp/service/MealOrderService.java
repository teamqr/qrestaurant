package com.qrestaurant.qrapp.service;

import com.qrestaurant.qrapp.common.JWTUtil;
import com.qrestaurant.qrapp.model.entity.MealOrder;
import com.qrestaurant.qrapp.repository.MealOrderRepository;
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
        Long userId = jwtToken.getClaim("id");

        return mealOrderRepository.getAllByOrder_IdAndOrder_User_Id(orderId, userId);
    }
}

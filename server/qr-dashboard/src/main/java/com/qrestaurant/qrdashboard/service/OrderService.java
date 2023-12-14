package com.qrestaurant.qrdashboard.service;

import com.qrestaurant.qrdashboard.common.JWTUtil;
import com.qrestaurant.qrdashboard.exception.EntityNotFoundException;
import com.qrestaurant.qrdashboard.model.entity.Order;
import com.qrestaurant.qrdashboard.repository.OrderRepository;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final JWTUtil jwtUtil;

    public OrderService(OrderRepository orderRepository, JWTUtil jwtUtil) {
        this.orderRepository = orderRepository;
        this.jwtUtil = jwtUtil;
    }

    public Iterable<Order> getOrders(String authorizationHeader) {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        return orderRepository.getAllByRestaurant_Id(restaurantId);
    }

    public Order getOrder(String authorizationHeader, Long id) throws EntityNotFoundException {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        return orderRepository
                .findByIdAndRestaurant_Id(id, restaurantId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Order with id: " + id + " does not exists in restaurant with id: " + restaurantId + '.'));
    }
}

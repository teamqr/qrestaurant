package com.qrestaurant.qrapp.service;

import com.qrestaurant.qrapp.common.JWTUtil;
import com.qrestaurant.qrapp.exception.EntityNotFoundException;
import com.qrestaurant.qrapp.model.entity.Order;
import com.qrestaurant.qrapp.repository.OrderRepository;
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
        Long id = jwtToken.getClaim("id");

        return orderRepository.getAllByUser_Id(id);
    }

    public Order getOrder(String authorizationHeader, Long id) throws EntityNotFoundException {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long userId = jwtToken.getClaim("id");

        return orderRepository
                .findByIdAndUser_Id(id, userId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "User with id: " + userId + " does not have an order with id: " + id + '.'));
    }
}

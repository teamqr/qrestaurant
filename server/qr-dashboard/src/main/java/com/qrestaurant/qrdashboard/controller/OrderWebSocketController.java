package com.qrestaurant.qrdashboard.controller;

import com.qrestaurant.qrdashboard.service.OrderService;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

@Controller
public class OrderWebSocketController {
    private final OrderService orderService;

    public OrderWebSocketController(OrderService orderService) {
        this.orderService = orderService;
    }

    @SubscribeMapping("/topic/order/{restaurantId}")
    public Long xd(@DestinationVariable Long id) {
        return id;
    }
}

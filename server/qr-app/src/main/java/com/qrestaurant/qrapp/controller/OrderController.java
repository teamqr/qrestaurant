package com.qrestaurant.qrapp.controller;

import com.qrestaurant.qrapp.common.MapperDTO;
import com.qrestaurant.qrapp.model.dto.OrderDTO;
import com.qrestaurant.qrapp.model.entity.Order;
import com.qrestaurant.qrapp.model.request.NewOrderRequest;
import com.qrestaurant.qrapp.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/app/order")
public class OrderController {
    private final OrderService orderService;
    private final MapperDTO mapperDTO;

    public OrderController(OrderService orderService, MapperDTO mapperDTO) {
        this.orderService = orderService;
        this.mapperDTO = mapperDTO;
    }

    @GetMapping
    public ResponseEntity<Map<String, Iterable<OrderDTO>>> getOrders(
            @RequestHeader("Authorization") String authorizationHeader) {
        Iterable<Order> orders = orderService.getOrders(authorizationHeader);

        Map<String, Iterable<OrderDTO>> response = new HashMap<>();
        response.put("orders", mapperDTO.toOrderDTOs(orders));

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, OrderDTO>> getOrder(@RequestHeader("Authorization") String authorizationHeader,
                                                          @PathVariable Long id) {
        Order order = orderService.getOrder(authorizationHeader, id);

        Map<String, OrderDTO> response = new HashMap<>();
        response.put("order", mapperDTO.toOrderDTO(order));

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Map<String, OrderDTO>> createOrder(@RequestHeader("Authorization") String authorizationHeader,
                                                             @Valid @RequestBody NewOrderRequest newOrderRequest) {
        Order order = orderService.createOrder(authorizationHeader, newOrderRequest);

        Map<String, OrderDTO> response = new HashMap<>();
        response.put("order", mapperDTO.toOrderDTO(order));

        return ResponseEntity.ok(response);
    }
}

package com.qrestaurant.qrapp.controller;

import com.qrestaurant.qrapp.common.MapperDTO;
import com.qrestaurant.qrapp.model.dto.MealOrderDTO;
import com.qrestaurant.qrapp.model.entity.MealOrder;
import com.qrestaurant.qrapp.service.MealOrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/app/meal-order")
public class MealOrderController {
    private final MealOrderService mealOrderService;
    private final MapperDTO mapperDTO;

    public MealOrderController(MealOrderService mealOrderService, MapperDTO mapperDTO) {
        this.mealOrderService = mealOrderService;
        this.mapperDTO = mapperDTO;
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Map<String, Iterable<MealOrderDTO>>> getAllByOrderId(
            @RequestHeader(value = "Authorization") String authorizationHeader, @PathVariable Long orderId) {
        Iterable<MealOrder> mealOrders = mealOrderService.getAllByOrderId(authorizationHeader, orderId);

        Map<String, Iterable<MealOrderDTO>> response = new HashMap<>();
        response.put("mealOrders", mapperDTO.toMealOrderDTOs(mealOrders));

        return ResponseEntity.ok(response);
    }
}

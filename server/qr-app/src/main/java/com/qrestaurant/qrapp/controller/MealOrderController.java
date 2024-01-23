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

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, MealOrderDTO>> getMealOrder(@PathVariable Long id) {
        MealOrder mealOrder = mealOrderService.getMealOrder(id);

        Map<String, MealOrderDTO> response = new HashMap<>();
        response.put("mealOrder", mapperDTO.toMealOrderDTO(mealOrder));

        return ResponseEntity.ok(response);
    }
}

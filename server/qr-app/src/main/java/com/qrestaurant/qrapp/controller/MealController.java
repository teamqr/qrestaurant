package com.qrestaurant.qrapp.controller;

import com.qrestaurant.qrapp.common.MapperDTO;
import com.qrestaurant.qrapp.model.dto.MealDTO;
import com.qrestaurant.qrapp.model.entity.Meal;
import com.qrestaurant.qrapp.service.MealService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/app/meal")
public class MealController {
    private final MealService mealService;
    private final MapperDTO mapperDTO;

    public MealController(MealService mealService, MapperDTO mapperDTO) {
        this.mealService = mealService;
        this.mapperDTO = mapperDTO;
    }

    @GetMapping
    public ResponseEntity<Map<String, Iterable<MealDTO>>> getMeals(@RequestParam Long restaurantId) {
        Iterable<Meal> meals = mealService.getMeals(restaurantId);

        Map<String, Iterable<MealDTO>> response = new HashMap<>();
        response.put("meals", mapperDTO.toMealDTOs(meals));

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, MealDTO>> getMeal(@PathVariable Long id, @RequestParam Long restaurantId) {
        Meal meal = mealService.getMeal(id, restaurantId);

        Map<String, MealDTO> response = new HashMap<>();
        response.put("meal", mapperDTO.toMealDTO(meal));

        return ResponseEntity.ok(response);
    }
}

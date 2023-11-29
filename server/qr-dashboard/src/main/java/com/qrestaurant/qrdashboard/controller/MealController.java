package com.qrestaurant.qrdashboard.controller;

import com.qrestaurant.qrdashboard.common.MapperDTO;
import com.qrestaurant.qrdashboard.model.dto.MealDTO;
import com.qrestaurant.qrdashboard.model.entity.Meal;
import com.qrestaurant.qrdashboard.model.request.NewMealRequest;
import com.qrestaurant.qrdashboard.model.request.UpdateMealRequest;
import com.qrestaurant.qrdashboard.service.MealService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard/meal")
public class MealController {
    private final MealService mealService;
    private final MapperDTO mapperDTO;

    public MealController(MealService mealService, MapperDTO mapperDTO) {
        this.mealService = mealService;
        this.mapperDTO = mapperDTO;
    }

    @GetMapping
    public ResponseEntity<Map<String, Iterable<MealDTO>>> getMeals(
            @RequestHeader("Authorization") String authorizationHeader) {
        Iterable<Meal> meals = mealService.getMeals(authorizationHeader);

        Map<String, Iterable<MealDTO>> response = new HashMap<>();
        response.put("meals", mapperDTO.toMealDTOs(meals));

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, MealDTO>> getMeal(@RequestHeader("Authorization") String authorizationHeader,
                                                     @PathVariable Long id) {
        Meal meal = mealService.getMeal(id, authorizationHeader);

        Map<String, MealDTO> response = new HashMap<>();
        response.put("meal", mapperDTO.toMealDTO(meal));

        return ResponseEntity.ok(response);
    }

    @PostMapping
    @PreAuthorize(value = "hasAuthority('SCOPE_ADMIN')")
    public ResponseEntity<Map<String, MealDTO>> createMeal(@RequestHeader("Authorization") String authorizationHeader,
                                                        @Valid @RequestBody NewMealRequest newMealRequest) {
        Meal meal = mealService.createMeal(authorizationHeader, newMealRequest);

        Map<String, MealDTO> response = new HashMap<>();
        response.put("meal", mapperDTO.toMealDTO(meal));

        return ResponseEntity.ok(response);
    }

    @PutMapping
    @PreAuthorize(value = "hasAuthority('SCOPE_ADMIN')")
    public ResponseEntity<Map<String, MealDTO>> updateMeal(@RequestHeader("Authorization") String authorizationHeader,
                                                        @Valid @RequestBody UpdateMealRequest updateMealRequest) {
        Meal meal = mealService.updateMeal(authorizationHeader, updateMealRequest);

        Map<String, MealDTO> response = new HashMap<>();
        response.put("meal", mapperDTO.toMealDTO(meal));

        return ResponseEntity.ok(response);
    }
}

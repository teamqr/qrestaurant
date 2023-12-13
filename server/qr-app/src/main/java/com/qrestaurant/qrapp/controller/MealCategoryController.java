package com.qrestaurant.qrapp.controller;

import com.qrestaurant.qrapp.common.MapperDTO;
import com.qrestaurant.qrapp.model.dto.MealCategoryDTO;
import com.qrestaurant.qrapp.model.entity.MealCategory;
import com.qrestaurant.qrapp.service.MealCategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/app/meal-category")
public class MealCategoryController {
    private final MealCategoryService mealCategoryService;
    private final MapperDTO mapperDTO;

    public MealCategoryController(MealCategoryService mealCategoryService, MapperDTO mapperDTO) {
        this.mealCategoryService = mealCategoryService;
        this.mapperDTO = mapperDTO;
    }

    @GetMapping
    public ResponseEntity<Map<String, Iterable<MealCategoryDTO>>> getMealCategories(@RequestParam Long restaurantId) {
        Iterable<MealCategory> mealCategories = mealCategoryService.getMealCategories(restaurantId);

        Map<String, Iterable<MealCategoryDTO>> response = new HashMap<>();
        response.put("mealCategories", mapperDTO.toMealCategoryDTOs(mealCategories));

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, MealCategoryDTO>> getMealCategory(@PathVariable Long id,
                                                                        @RequestParam Long restaurantId) {
        MealCategory mealCategory = mealCategoryService.getMealCategory(id, restaurantId);

        Map<String, MealCategoryDTO> response = new HashMap<>();
        response.put("mealCategory", mapperDTO.toMealCategoryDTO(mealCategory));

        return ResponseEntity.ok(response);
    }
}

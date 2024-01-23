package com.qrestaurant.qrdashboard.controller;

import com.qrestaurant.qrdashboard.common.MapperDTO;
import com.qrestaurant.qrdashboard.model.dto.MealCategoryDTO;
import com.qrestaurant.qrdashboard.model.entity.MealCategory;
import com.qrestaurant.qrdashboard.model.request.NewMealCategoryRequest;
import com.qrestaurant.qrdashboard.model.request.UpdateMealCategoryRequest;
import com.qrestaurant.qrdashboard.service.MealCategoryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard/meal-category")
public class MealCategoryController {
    private final MealCategoryService mealCategoryService;
    private final MapperDTO mapperDTO;

    public MealCategoryController(MealCategoryService mealCategoryService, MapperDTO mapperDTO) {
        this.mealCategoryService = mealCategoryService;
        this.mapperDTO = mapperDTO;
    }

    @GetMapping
    public ResponseEntity<Map<String, Iterable<MealCategoryDTO>>> getMealCategories(
            @RequestHeader("Authorization") String authorizationHeader) {
        Iterable<MealCategory> mealCategories = mealCategoryService.getMealCategories(authorizationHeader);

        Map<String, Iterable<MealCategoryDTO>> response = new HashMap<>();
        response.put("mealCategories", mapperDTO.toMealCategoryDTOs(mealCategories));

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, MealCategoryDTO>> getMealCategory(
            @RequestHeader("Authorization") String authorizationHeader, @PathVariable Long id) {
        MealCategory mealCategory = mealCategoryService.getMealCategory(authorizationHeader, id);

        Map<String, MealCategoryDTO> response = new HashMap<>();
        response.put("mealCategory", mapperDTO.toMealCategoryDTO(mealCategory));

        return ResponseEntity.ok(response);
    }

    @PostMapping
    @PreAuthorize(value = "hasAuthority('SCOPE_ADMIN')")
    public ResponseEntity<Map<String, MealCategoryDTO>> createMealCategory(
            @RequestHeader("Authorization") String authorizationHeader,
            @Valid @RequestBody NewMealCategoryRequest newMealCategoryRequest) {
        MealCategory mealCategory = mealCategoryService.createMealCategory(authorizationHeader, newMealCategoryRequest);

        Map<String, MealCategoryDTO> response = new HashMap<>();
        response.put("mealCategory", mapperDTO.toMealCategoryDTO(mealCategory));

        return ResponseEntity.ok(response);
    }

    @PutMapping
    @PreAuthorize(value = "hasAuthority('SCOPE_ADMIN')")
    public ResponseEntity<Map<String, MealCategoryDTO>> updateMealCategory(
            @RequestHeader("Authorization") String authorizationHeader,
            @Valid @RequestBody UpdateMealCategoryRequest updateMealCategoryRequest) {
        MealCategory mealCategory =
                mealCategoryService.updateMealCategory(authorizationHeader, updateMealCategoryRequest);

        Map<String, MealCategoryDTO> response = new HashMap<>();
        response.put("mealCategory", mapperDTO.toMealCategoryDTO(mealCategory));

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize(value = "hasAuthority('SCOPE_ADMIN')")
    public ResponseEntity<Map<String, MealCategoryDTO>> deleteMealCategory(
            @RequestHeader("Authorization") String authorizationHeader, @PathVariable Long id) {
        MealCategory mealCategory = mealCategoryService.deleteMealCategory(authorizationHeader, id);

        Map<String, MealCategoryDTO> response = new HashMap<>();
        response.put("mealCategory", mapperDTO.toMealCategoryDTO(mealCategory));

        return ResponseEntity.ok(response);
    }
}

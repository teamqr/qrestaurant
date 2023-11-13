package com.qrestaurant.qrdashboard.controller;

import com.qrestaurant.qrdashboard.model.Restaurant;
import com.qrestaurant.qrdashboard.service.RestaurantService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard/restaurant")
public class RestaurantController {
    private final RestaurantService restaurantService;

    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Restaurant>> getRestaurant(@PathVariable Long id) {
        Restaurant restaurant = restaurantService.getRestaurant(id);

        Map<String, Restaurant> response = new HashMap<>();
        response.put("restaurant", restaurant);

        return ResponseEntity.ok(response);
    }

    @PutMapping
    @PreAuthorize(value = "hasAuthority('SCOPE_ADMIN')")
    public ResponseEntity<Map<String, Restaurant>> updateRestaurant(@Valid @RequestBody Restaurant restaurant) {
        Restaurant updatedRestaurant = restaurantService.updateRestaurant(restaurant);

        Map<String, Restaurant> response = new HashMap<>();
        response.put("restaurant", updatedRestaurant);

        return ResponseEntity.ok(response);
    }
}

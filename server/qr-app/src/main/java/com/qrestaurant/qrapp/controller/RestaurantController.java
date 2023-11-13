package com.qrestaurant.qrapp.controller;

import com.qrestaurant.qrapp.model.Restaurant;
import com.qrestaurant.qrapp.service.RestaurantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/app/restaurant")
public class RestaurantController {
    private final RestaurantService restaurantService;

    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Iterable<Restaurant>>> getRestaurants() {
        Iterable<Restaurant> restaurants = restaurantService.getRestaurants();

        Map<String, Iterable<Restaurant>> response  = new HashMap<>();
        response.put("restaurants", restaurants);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Restaurant>> getRestaurant(@PathVariable Long id) {
        Restaurant restaurant = restaurantService.getRestaurant(id);

        Map<String, Restaurant> response = new HashMap<>();
        response.put("restaurant", restaurant);

        return ResponseEntity.ok(response);
    }
}

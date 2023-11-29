package com.qrestaurant.qrapp.controller;

import com.qrestaurant.qrapp.common.MapperDTO;
import com.qrestaurant.qrapp.model.dto.RestaurantDTO;
import com.qrestaurant.qrapp.model.entity.Restaurant;
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
    private final MapperDTO mapperDTO;

    public RestaurantController(RestaurantService restaurantService, MapperDTO mapperDTO) {
        this.restaurantService = restaurantService;
        this.mapperDTO = mapperDTO;
    }

    @GetMapping
    public ResponseEntity<Map<String, Iterable<RestaurantDTO>>> getRestaurants() {
        Iterable<Restaurant> restaurants = restaurantService.getRestaurants();

        Map<String, Iterable<RestaurantDTO>> response  = new HashMap<>();
        response.put("restaurants", mapperDTO.toRestaurantDTOs(restaurants));

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, RestaurantDTO>> getRestaurant(@PathVariable Long id) {
        Restaurant restaurant = restaurantService.getRestaurant(id);

        Map<String, RestaurantDTO> response = new HashMap<>();
        response.put("restaurant", mapperDTO.toRestaurantDTO(restaurant));

        return ResponseEntity.ok(response);
    }
}

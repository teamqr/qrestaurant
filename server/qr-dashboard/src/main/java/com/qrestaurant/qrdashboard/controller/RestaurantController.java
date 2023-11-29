package com.qrestaurant.qrdashboard.controller;

import com.qrestaurant.qrdashboard.common.MapperDTO;
import com.qrestaurant.qrdashboard.model.dto.RestaurantDTO;
import com.qrestaurant.qrdashboard.model.entity.Restaurant;
import com.qrestaurant.qrdashboard.model.request.UpdateRestaurantRequest;
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
    private final MapperDTO mapperDTO;

    public RestaurantController(RestaurantService restaurantService, MapperDTO mapperDTO) {
        this.restaurantService = restaurantService;
        this.mapperDTO = mapperDTO;
    }

    @GetMapping
    public ResponseEntity<Map<String, RestaurantDTO>> getRestaurant(
            @RequestHeader("Authorization") String authorizationHeader) {
        Restaurant restaurant = restaurantService.getRestaurant(authorizationHeader);

        Map<String, RestaurantDTO> response = new HashMap<>();
        response.put("restaurant", mapperDTO.toRestaurantDTO(restaurant));

        return ResponseEntity.ok(response);
    }

    @PutMapping
    @PreAuthorize(value = "hasAuthority('SCOPE_ADMIN')")
    public ResponseEntity<Map<String, RestaurantDTO>> updateRestaurant(
            @RequestHeader("Authorization") String authorizationHeader,
            @Valid @RequestBody UpdateRestaurantRequest updateRestaurantRequest
    ) {
        Restaurant restaurant = restaurantService.updateRestaurant(authorizationHeader, updateRestaurantRequest);

        Map<String, RestaurantDTO> response = new HashMap<>();
        response.put("restaurant", mapperDTO.toRestaurantDTO(restaurant));

        return ResponseEntity.ok(response);
    }
}

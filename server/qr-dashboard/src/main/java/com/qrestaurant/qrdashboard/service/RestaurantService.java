package com.qrestaurant.qrdashboard.service;

import com.qrestaurant.qrdashboard.common.JWTUtil;
import com.qrestaurant.qrdashboard.common.MapperDTO;
import com.qrestaurant.qrdashboard.exception.EntityNotFoundException;
import com.qrestaurant.qrdashboard.model.dto.RestaurantDTO;
import com.qrestaurant.qrdashboard.model.entity.Restaurant;
import com.qrestaurant.qrdashboard.model.request.UpdateRestaurantRequest;
import com.qrestaurant.qrdashboard.repository.RestaurantRepository;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;
    private final KafkaTemplate<String, RestaurantDTO> restaurantKafkaTemplate;
    private final JWTUtil jwtUtil;
    private final MapperDTO mapperDTO;

    public RestaurantService(RestaurantRepository restaurantRepository,
                             KafkaTemplate<String, RestaurantDTO> restaurantKafkaTemplate, JWTUtil jwtUtil,
                             MapperDTO mapperDTO) {
        this.restaurantRepository = restaurantRepository;
        this.restaurantKafkaTemplate = restaurantKafkaTemplate;
        this.jwtUtil = jwtUtil;
        this.mapperDTO  = mapperDTO;
    }

    public Restaurant getRestaurant(String authorizationHeader) throws EntityNotFoundException {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        return restaurantRepository
                .findById(restaurantId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Restaurant with id: " + restaurantId + " does not exist."));
    }

    public Restaurant updateRestaurant(String authorizationHeader, UpdateRestaurantRequest updateRestaurantRequest)
            throws EntityNotFoundException {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        Optional<Restaurant> optionalRestaurant = restaurantRepository.findById(restaurantId);

        if (optionalRestaurant.isPresent()) {
            Restaurant restaurant = optionalRestaurant.get();

            restaurant.setName(updateRestaurantRequest.name());
            restaurant.setImage(updateRestaurantRequest.image());

            restaurant = restaurantRepository.save(restaurant);

            restaurantKafkaTemplate.send("dashboard-restaurant", mapperDTO.toRestaurantDTO(restaurant));

            return restaurant;
        } else {
            throw new EntityNotFoundException("Restaurant with id: " + restaurantId + " does not exist.");
        }
    }
}

package com.qrestaurant.qrdashboard.service;

import com.qrestaurant.qrdashboard.common.JWTUtil;
import com.qrestaurant.qrdashboard.exception.EntityNotFoundException;
import com.qrestaurant.qrdashboard.model.entity.Menu;
import com.qrestaurant.qrdashboard.model.entity.Restaurant;
import com.qrestaurant.qrdashboard.model.request.UpdateRestaurantRequest;
import com.qrestaurant.qrdashboard.repository.MenuRepository;
import com.qrestaurant.qrdashboard.repository.RestaurantRepository;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;
    private final MenuRepository menuRepository;
    private final KafkaTemplate<String, Restaurant> restaurantKafkaTemplate;
    private final JWTUtil jwtUtil;

    public RestaurantService(RestaurantRepository restaurantRepository, MenuRepository menuRepository,
                             KafkaTemplate<String, Restaurant> restaurantKafkaTemplate, JWTUtil jwtUtil) {
        this.restaurantRepository = restaurantRepository;
        this.menuRepository = menuRepository;
        this.restaurantKafkaTemplate = restaurantKafkaTemplate;
        this.jwtUtil = jwtUtil;
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
            Optional<Menu> optionalMenu = menuRepository.findById(updateRestaurantRequest.menuId());

            if (optionalMenu.isPresent()) {
                Menu menu = optionalMenu.get();

                restaurant.setName(updateRestaurantRequest.name());
                restaurant.setMenu(menu);

                restaurant = restaurantRepository.save(restaurant);

                restaurantKafkaTemplate.send("dashboard-restaurant", restaurant);

                return restaurant;
            } else {
                throw new EntityNotFoundException(
                        "Menu with id: " + updateRestaurantRequest.menuId() + "does not exists.");
            }
        } else {
            throw new EntityNotFoundException("Restaurant with id: " + restaurantId + " does not exist.");
        }
    }
}

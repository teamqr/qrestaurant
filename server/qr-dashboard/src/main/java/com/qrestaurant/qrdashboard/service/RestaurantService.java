package com.qrestaurant.qrdashboard.service;

import com.qrestaurant.qrdashboard.exception.EntityNotFoundException;
import com.qrestaurant.qrdashboard.model.Restaurant;
import com.qrestaurant.qrdashboard.repository.RestaurantRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;

    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    public Restaurant getRestaurant(Long id) throws EntityNotFoundException {
        return restaurantRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Restaurant with id: " + id + " does not exist."));
    }

    public Restaurant updateRestaurant(Restaurant restaurant) throws EntityNotFoundException {
        Optional<Restaurant> optionalRestaurant = restaurantRepository.findById(restaurant.getId());

        if (optionalRestaurant.isPresent()) {
            restaurantRepository.save(restaurant);

            return restaurant;
        } else {
            throw new EntityNotFoundException("Restaurant with id: " + restaurant.getId() + " does not exist.");
        }
    }
}

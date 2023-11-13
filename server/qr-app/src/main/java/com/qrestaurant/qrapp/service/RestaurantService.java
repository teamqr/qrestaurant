package com.qrestaurant.qrapp.service;

import com.qrestaurant.qrapp.exception.EntityNotFoundException;
import com.qrestaurant.qrapp.model.Restaurant;
import com.qrestaurant.qrapp.repository.RestaurantRepository;
import org.springframework.stereotype.Service;

@Service
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;

    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository =restaurantRepository;
    }

    public Iterable<Restaurant> getRestaurants() {
        return restaurantRepository.findAll();
    }

    public Restaurant getRestaurant(Long id) throws EntityNotFoundException {
        return restaurantRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Restaurant with id: " + id + " does not exist."));
    }
}

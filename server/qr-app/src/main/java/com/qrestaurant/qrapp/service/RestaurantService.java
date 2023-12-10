package com.qrestaurant.qrapp.service;

import com.qrestaurant.qrapp.exception.EntityNotFoundException;
import com.qrestaurant.qrapp.model.dto.RestaurantDTO;
import com.qrestaurant.qrapp.model.entity.Restaurant;
import com.qrestaurant.qrapp.repository.RestaurantRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;

    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    public Iterable<Restaurant> getRestaurants() {
        return restaurantRepository.findAll();
    }

    public Restaurant getRestaurant(Long id) throws EntityNotFoundException {
        return restaurantRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Restaurant with id: " + id + " does not exist."));
    }

    @KafkaListener(topics = "dashboard-restaurant", groupId = "qrestaurant",
            containerFactory = "restaurantKafkaListenerContainerFactory")
    public void restaurantListener(RestaurantDTO restaurantDTO) {
        Optional<Restaurant> optionalRestaurant = restaurantRepository.findById(restaurantDTO.id());

        if (optionalRestaurant.isPresent()) {
            Restaurant restaurant = optionalRestaurant.get();

            restaurant.setName(restaurantDTO.name());
            restaurant.setImage(restaurantDTO.image());

            restaurantRepository.save(restaurant);
        }
    }
}

package com.qrestaurant.qrapp.service;

import com.qrestaurant.qrapp.exception.EntityNotFoundException;
import com.qrestaurant.qrapp.model.dto.MenuDTO;
import com.qrestaurant.qrapp.model.entity.Menu;
import com.qrestaurant.qrapp.model.entity.Restaurant;
import com.qrestaurant.qrapp.repository.MenuRepository;
import com.qrestaurant.qrapp.repository.RestaurantRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MenuService {
    private final MenuRepository menuRepository;
    private final RestaurantRepository restaurantRepository;

    public MenuService(MenuRepository menuRepository, RestaurantRepository restaurantRepository) {
        this.menuRepository = menuRepository;
        this.restaurantRepository = restaurantRepository;
    }

    public Menu getMenu(Long id) throws EntityNotFoundException {
        return menuRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Menu with id: " + id + " does not exists."));
    }

    @KafkaListener(topics = "dashboard-menu", groupId = "qrestaurant",
            containerFactory = "menuConcurrentKafkaListenerContainerFactory")
    public void menuListener(MenuDTO menuDTO) {
        Menu menu = new Menu(menuDTO.id());

        Optional<Restaurant> optionalRestaurant = restaurantRepository.findById(menuDTO.restaurantId());

        if (optionalRestaurant.isPresent()) {
            menu.setRestaurant(optionalRestaurant.get());

            menuRepository.save(menu);
        }
    }
}

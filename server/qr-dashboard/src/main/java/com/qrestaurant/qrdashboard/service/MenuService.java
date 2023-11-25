package com.qrestaurant.qrdashboard.service;

import com.qrestaurant.qrdashboard.common.JWTUtil;
import com.qrestaurant.qrdashboard.exception.EntityAlreadyExistsException;
import com.qrestaurant.qrdashboard.exception.EntityNotFoundException;
import com.qrestaurant.qrdashboard.model.entity.Menu;
import com.qrestaurant.qrdashboard.model.entity.Restaurant;
import com.qrestaurant.qrdashboard.repository.MenuRepository;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MenuService {
    private final RestaurantService restaurantService;
    private final MenuRepository menuRepository;
    private final KafkaTemplate<String, Menu> menuKafkaTemplate;
    private final JWTUtil jwtUtil;

    public MenuService(RestaurantService restaurantService, MenuRepository menuRepository,
                       KafkaTemplate<String, Menu> menuKafkaTemplate, JWTUtil jwtUtil) {
        this.restaurantService = restaurantService;
        this.menuRepository = menuRepository;
        this.menuKafkaTemplate = menuKafkaTemplate;
        this.jwtUtil = jwtUtil;
    }

    public Menu getMenu(String authorizationHeader) throws EntityNotFoundException {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        Optional<Menu> optionalMenu = menuRepository.findMenuByRestaurant_Id(restaurantId);

        if (optionalMenu.isPresent()) {
            return optionalMenu.get();
        } else {
            throw new EntityNotFoundException("Restaurant with id: " + restaurantId + " has no menu.");
        }
    }

    public Menu createMenu(String authorizationHeader) throws RuntimeException {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        Optional<Menu> optionalMenu = menuRepository.findMenuByRestaurant_Id(restaurantId);

        if (optionalMenu.isPresent()) {
            throw new EntityAlreadyExistsException("Restaurant with id: " + restaurantId + "already has a menu.");
        }

        try {
            Menu menu = menuRepository.save(new Menu());

            menuKafkaTemplate.send("dashboard-menu", menu);

            Restaurant restaurant = restaurantService.getRestaurant(restaurantId);
            restaurant.setMenu(menu);

            restaurantService.updateRestaurant(restaurant);

            return menu;
        } catch (EntityNotFoundException e) {
            throw new EntityNotFoundException(e.getMessage());
        }
    }
}

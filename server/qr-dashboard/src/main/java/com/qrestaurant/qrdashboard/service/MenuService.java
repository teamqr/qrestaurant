package com.qrestaurant.qrdashboard.service;

import com.qrestaurant.qrdashboard.common.JWTUtil;
import com.qrestaurant.qrdashboard.common.MapperDTO;
import com.qrestaurant.qrdashboard.exception.EntityAlreadyExistsException;
import com.qrestaurant.qrdashboard.exception.EntityNotFoundException;
import com.qrestaurant.qrdashboard.model.dto.MenuDTO;
import com.qrestaurant.qrdashboard.model.entity.Menu;
import com.qrestaurant.qrdashboard.model.entity.Restaurant;
import com.qrestaurant.qrdashboard.repository.MenuRepository;
import com.qrestaurant.qrdashboard.repository.RestaurantRepository;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MenuService {
    private final MenuRepository menuRepository;
    private final RestaurantRepository restaurantRepository;
    private final KafkaTemplate<String, MenuDTO> menuKafkaTemplate;
    private final JWTUtil jwtUtil;
    private final MapperDTO mapperDTO;

    public MenuService(MenuRepository menuRepository, RestaurantRepository restaurantRepository,
                       KafkaTemplate<String, MenuDTO> menuKafkaTemplate, JWTUtil jwtUtil, MapperDTO mapperDTO) {
        this.menuRepository = menuRepository;
        this.restaurantRepository = restaurantRepository;
        this.menuKafkaTemplate = menuKafkaTemplate;
        this.jwtUtil = jwtUtil;
        this.mapperDTO = mapperDTO;
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
            throw new EntityAlreadyExistsException("Restaurant with id: " + restaurantId + " already has a menu.");
        }

        Menu menu = new Menu();
        Optional<Restaurant> optionalRestaurant = restaurantRepository.findById(restaurantId);

        if (optionalRestaurant.isPresent()) {
            menu.setRestaurant(optionalRestaurant.get());

            menu = menuRepository.save(menu);

            menuKafkaTemplate.send("dashboard-menu", mapperDTO.toMenuDTO(menu));

            return menu;
        } else {
            throw new EntityNotFoundException("Restaurant with id: " + restaurantId + " does not exists.");
        }
    }
}

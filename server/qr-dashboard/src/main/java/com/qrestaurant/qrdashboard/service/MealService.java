package com.qrestaurant.qrdashboard.service;

import com.qrestaurant.qrdashboard.common.JWTUtil;
import com.qrestaurant.qrdashboard.exception.EntityNotFoundException;
import com.qrestaurant.qrdashboard.model.entity.Meal;
import com.qrestaurant.qrdashboard.model.entity.Menu;
import com.qrestaurant.qrdashboard.model.request.NewMealRequest;
import com.qrestaurant.qrdashboard.model.request.UpdateMealRequest;
import com.qrestaurant.qrdashboard.repository.MealRepository;
import com.qrestaurant.qrdashboard.repository.MenuRepository;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MealService {
    private final MealRepository mealRepository;
    private final MenuRepository menuRepository;
    private final KafkaTemplate<String, Meal> mealKafkaTemplate;
    private final JWTUtil jwtUtil;

    public MealService(MealRepository mealRepository, MenuRepository menuRepository,
                       KafkaTemplate<String, Meal> mealKafkaTemplate, JWTUtil jwtUtil) {
        this.mealRepository = mealRepository;
        this.menuRepository = menuRepository;
        this.mealKafkaTemplate = mealKafkaTemplate;
        this.jwtUtil = jwtUtil;
    }

    public Iterable<Meal> getMeals(String authorizationHeader) {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        return mealRepository.getAllByMenu_Restaurant_Id(restaurantId);
    }

    public Meal getMeal(Long id, String authorizationHeader) throws EntityNotFoundException {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        return mealRepository
                .findByIdAndMenu_Restaurant_Id(id, restaurantId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Meal with id: " + id + " does not exists in restaurant with id: " + restaurantId + "."));
    }

    public Meal createMeal(String authorizationHeader, NewMealRequest newMealRequest) throws EntityNotFoundException {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        Optional<Menu> optionalMenu = menuRepository.findMenuByRestaurant_Id(restaurantId);

        if (optionalMenu.isPresent()) {
            Menu menu = optionalMenu.get();

            Meal meal = new Meal(newMealRequest.name(), newMealRequest.description(), newMealRequest.price());
            meal.setMenu(menu);

            meal = mealRepository.save(meal);

            mealKafkaTemplate.send("dashboard-meal", meal);

            return meal;
        } else {
            throw new EntityNotFoundException("Restaurant with id: " + restaurantId + " has no menu.");
        }
    }

    public Meal updateMeal(String authorizationHeader, UpdateMealRequest updateMealRequest)
            throws EntityNotFoundException {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        Optional<Meal> optionalMeal = mealRepository.findByIdAndMenu_Restaurant_Id(updateMealRequest.id(), restaurantId);

        if (optionalMeal.isPresent()) {
            Meal meal = optionalMeal.get();

            meal.setName(updateMealRequest.name());
            meal.setDescription(updateMealRequest.description());
            meal.setPrice(updateMealRequest.price());

            meal = mealRepository.save(meal);

            mealKafkaTemplate.send("dashboard-meal", meal);

            return meal;
        } else {
            throw new EntityNotFoundException(
                    "Meal with id: " + updateMealRequest.id() + " does not exists in restaurant with id: " +
                            restaurantId + '.');
        }
    }
}

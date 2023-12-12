package com.qrestaurant.qrdashboard.service;

import com.qrestaurant.qrdashboard.common.JWTUtil;
import com.qrestaurant.qrdashboard.common.MapperDTO;
import com.qrestaurant.qrdashboard.exception.EntityNotFoundException;
import com.qrestaurant.qrdashboard.model.dto.MealDTO;
import com.qrestaurant.qrdashboard.model.entity.Meal;
import com.qrestaurant.qrdashboard.model.entity.MealCategory;
import com.qrestaurant.qrdashboard.model.entity.Menu;
import com.qrestaurant.qrdashboard.model.request.NewMealRequest;
import com.qrestaurant.qrdashboard.model.request.UpdateMealRequest;
import com.qrestaurant.qrdashboard.repository.MealCategoryRepository;
import com.qrestaurant.qrdashboard.repository.MealRepository;
import com.qrestaurant.qrdashboard.repository.MenuRepository;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MealService {
    private final MealRepository mealRepository;
    private final MealCategoryRepository mealCategoryRepository;
    private final MenuRepository menuRepository;
    private final KafkaTemplate<String, MealDTO> mealKafkaTemplate;
    private final KafkaTemplate<String, Long> deleteKafkaTemplate;
    private final JWTUtil jwtUtil;
    private final MapperDTO mapperDTO;

    public MealService(MealRepository mealRepository, MealCategoryRepository mealCategoryRepository,
                       MenuRepository menuRepository, KafkaTemplate<String, MealDTO> mealKafkaTemplate,
                       KafkaTemplate<String, Long> deleteKafkaTemplate, JWTUtil jwtUtil, MapperDTO mapperDTO) {
        this.mealRepository = mealRepository;
        this.mealCategoryRepository = mealCategoryRepository;
        this.menuRepository = menuRepository;
        this.mealKafkaTemplate = mealKafkaTemplate;
        this.deleteKafkaTemplate = deleteKafkaTemplate;
        this.jwtUtil = jwtUtil;
        this.mapperDTO = mapperDTO;
    }

    public Iterable<Meal> getMeals(String authorizationHeader) {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        return mealRepository.getAllByMenu_Restaurant_Id(restaurantId);
    }

    public Iterable<Meal> getMealsByCategory(String authorizationHeader, Long mealCategoryId) {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        return mealRepository.getAllByMenu_Restaurant_IdAndMealCategories_Id(restaurantId, mealCategoryId);
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

            Meal meal = new Meal(
                    newMealRequest.name(), newMealRequest.description(), newMealRequest.price(), newMealRequest.image());
            meal.setMenu(menu);
            meal.setMealCategories(getMealCategories(newMealRequest.mealCategoryIds(), restaurantId));

            meal = mealRepository.save(meal);

            mealKafkaTemplate.send("dashboard-meal", mapperDTO.toMealDTO(meal));

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
            meal.setImage(updateMealRequest.image());
            meal.setMealCategories(getMealCategories(updateMealRequest.mealCategoryIds(), restaurantId));

            meal = mealRepository.save(meal);

            mealKafkaTemplate.send("dashboard-meal", mapperDTO.toMealDTO(meal));

            return meal;
        } else {
            throw new EntityNotFoundException(
                    "Meal with id: " + updateMealRequest.id() + " does not exists in restaurant with id: " +
                            restaurantId + '.');
        }
    }

    public Meal deleteMeal(String authorizationHeader, Long id) throws EntityNotFoundException {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        Optional<Meal> optionalMeal = mealRepository.findByIdAndMenu_Restaurant_Id(id, restaurantId);

        if (optionalMeal.isPresent()) {
            mealRepository.deleteById(id);

            deleteKafkaTemplate.send("dashboard-meal-delete", id);

            return optionalMeal.get();
        } else {
            throw new EntityNotFoundException(
                    "Meal with id: " + id + " does not exists in restaurant with id: " + restaurantId + '.');
        }
    }

    private List<MealCategory> getMealCategories(Iterable<Long> mealCategoryIds, Long restaurantId) {
        List<MealCategory> mealCategories = new ArrayList<>();

        mealCategoryIds.forEach(id -> {
            Optional<MealCategory> optionalMealCategory =
                    mealCategoryRepository.findByIdAndRestaurant_Id(id, restaurantId);

            optionalMealCategory.ifPresent(mealCategories::add);
        });

        return mealCategories;
    }
}

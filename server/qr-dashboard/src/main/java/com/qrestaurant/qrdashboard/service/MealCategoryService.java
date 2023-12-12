package com.qrestaurant.qrdashboard.service;

import com.qrestaurant.qrdashboard.common.JWTUtil;
import com.qrestaurant.qrdashboard.exception.EntityAlreadyExistsException;
import com.qrestaurant.qrdashboard.exception.EntityNotFoundException;
import com.qrestaurant.qrdashboard.model.entity.MealCategory;
import com.qrestaurant.qrdashboard.model.entity.Restaurant;
import com.qrestaurant.qrdashboard.model.request.NewMealCategoryRequest;
import com.qrestaurant.qrdashboard.model.request.UpdateMealCategoryRequest;
import com.qrestaurant.qrdashboard.repository.MealCategoryRepository;
import com.qrestaurant.qrdashboard.repository.RestaurantRepository;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MealCategoryService {
    private final MealCategoryRepository mealCategoryRepository;
    private final RestaurantRepository restaurantRepository;
    private final JWTUtil jwtUtil;

    public MealCategoryService(MealCategoryRepository mealCategoryRepository, RestaurantRepository restaurantRepository,
                               JWTUtil jwtUtil) {
        this.mealCategoryRepository = mealCategoryRepository;
        this.restaurantRepository = restaurantRepository;
        this.jwtUtil = jwtUtil;
    }

    public Iterable<MealCategory> getMealCategories(String authorizationHeader) {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        return mealCategoryRepository.getAllByRestaurant_Id(restaurantId);
    }

    public MealCategory getMealCategory(String authorizationHeader, Long id) throws EntityNotFoundException {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        return mealCategoryRepository.findByIdAndRestaurant_Id(id, restaurantId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Meal category with id: " + id + " does not exists in restaurant with id: " + restaurantId + '.'));
    }

    public MealCategory createMealCategory(String authorizationHeader, NewMealCategoryRequest newMealCategoryRequest)
            throws RuntimeException {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        Optional<MealCategory> optionalMealCategory =
                mealCategoryRepository.findByNameAndRestaurant_Id(newMealCategoryRequest.name(), restaurantId);

        if (optionalMealCategory.isPresent()) {
            throw new EntityAlreadyExistsException(
                    "Meal category with name: " + newMealCategoryRequest.name() + " already exists.");
        }

        Optional<Restaurant> optionalRestaurant = restaurantRepository.findById(restaurantId);

        if (optionalRestaurant.isPresent()) {
            Restaurant restaurant = optionalRestaurant.get();

            MealCategory mealCategory = new MealCategory(newMealCategoryRequest.name());
            mealCategory.setRestaurant(restaurant);

            mealCategory = mealCategoryRepository.save(mealCategory);

            return mealCategory;
        } else {
            throw new EntityNotFoundException("Restaurant with id:" + restaurantId + " does not exists.");
        }
    }

    public MealCategory updateMealCategory(
            String authorizationHeader, UpdateMealCategoryRequest updateMealCategoryRequest) throws RuntimeException {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        Optional<MealCategory> optionalMealCategory =
                mealCategoryRepository.findByNameAndRestaurant_Id(updateMealCategoryRequest.name(), restaurantId);

        if (optionalMealCategory.isPresent()) {
            throw new EntityAlreadyExistsException("Meal category with name: " + updateMealCategoryRequest.name() +
                    " already exists in restaurant with id: " + restaurantId + '.');
        } else {
            optionalMealCategory =
                    mealCategoryRepository.findByIdAndRestaurant_Id(updateMealCategoryRequest.id(), restaurantId);

            if (optionalMealCategory.isPresent()) {
                MealCategory mealCategory = optionalMealCategory.get();
                mealCategory.setName(updateMealCategoryRequest.name());

                mealCategory = mealCategoryRepository.save(mealCategory);

                return mealCategory;
            } else {
                throw new EntityNotFoundException("Meal category with id: " + updateMealCategoryRequest.id() +
                        " does not exists in restaurant with id: " + restaurantId + '.');
            }
        }
    }

    public MealCategory deleteMealCategory(String authorizationHeader, Long id) throws EntityNotFoundException {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        Optional<MealCategory> optionalMealCategory = mealCategoryRepository.findByIdAndRestaurant_Id(id, restaurantId);

        if (optionalMealCategory.isPresent()) {
            mealCategoryRepository.deleteById(id);

            return optionalMealCategory.get();
        } else {
            throw new EntityNotFoundException(
                    "Meal category with id: " + id + " does not exists in resturant with id: " + restaurantId + '.');
        }
    }
}

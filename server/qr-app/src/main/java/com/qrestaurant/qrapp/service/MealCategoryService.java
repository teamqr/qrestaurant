package com.qrestaurant.qrapp.service;

import com.qrestaurant.qrapp.exception.EntityNotFoundException;
import com.qrestaurant.qrapp.model.entity.MealCategory;
import com.qrestaurant.qrapp.repository.MealCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MealCategoryService {
    private final MealCategoryRepository mealCategoryRepository;

    public MealCategoryService(MealCategoryRepository mealCategoryRepository) {
        this.mealCategoryRepository = mealCategoryRepository;
    }

    public Iterable<MealCategory> getMealCategories(Long restaurantId) {
        return mealCategoryRepository.getAllByRestaurant_Id(restaurantId);
    }

    public MealCategory getMealCategory(Long id, Long restaurantId) throws EntityNotFoundException {
        Optional<MealCategory> optionalMealCategory = mealCategoryRepository.findByIdAndRestaurant_Id(id, restaurantId);

        if (optionalMealCategory.isPresent()) {
            return optionalMealCategory.get();
        } else {
            throw new EntityNotFoundException(
                    "Meal category with id: " + id + "does not exists in restaurant with id: " + restaurantId + '.');
        }
    }
 }

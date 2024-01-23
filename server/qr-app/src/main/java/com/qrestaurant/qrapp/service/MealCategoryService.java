package com.qrestaurant.qrapp.service;

import com.qrestaurant.qrapp.exception.EntityNotFoundException;
import com.qrestaurant.qrapp.model.dto.MealCategoryDTO;
import com.qrestaurant.qrapp.model.entity.MealCategory;
import com.qrestaurant.qrapp.model.entity.Restaurant;
import com.qrestaurant.qrapp.repository.MealCategoryRepository;
import com.qrestaurant.qrapp.repository.RestaurantRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MealCategoryService {
    private final MealCategoryRepository mealCategoryRepository;
    private final RestaurantRepository restaurantRepository;

    public MealCategoryService(MealCategoryRepository mealCategoryRepository, RestaurantRepository restaurantRepository) {
        this.mealCategoryRepository = mealCategoryRepository;
        this.restaurantRepository = restaurantRepository;
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

    @KafkaListener(topics = "dashboard-meal-category", groupId = "qrestaurant",
            containerFactory = "mealCategoryConcurrentKafkaListenerContainerFactory")
    public void mealCategoryListener(MealCategoryDTO mealCategoryDTO) {
        MealCategory mealCategory = new MealCategory(mealCategoryDTO.id(), mealCategoryDTO.name());

        Optional<Restaurant> optionalRestaurant = restaurantRepository.findById(mealCategoryDTO.restaurantId());

        if (optionalRestaurant.isPresent()) {
            mealCategory.setRestaurant(optionalRestaurant.get());

            mealCategoryRepository.save(mealCategory);
        }
    }

    @KafkaListener(topics = "dashboard-meal-category-delete", groupId = "qrestaurant",
            containerFactory = "deleteKafkaListenerContainerFactory")
    public void mealCategoryDeleteListener(Long id) {
        mealCategoryRepository.deleteById(id);
    }
 }

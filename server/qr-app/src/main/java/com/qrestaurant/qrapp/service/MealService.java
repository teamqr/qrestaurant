package com.qrestaurant.qrapp.service;

import com.qrestaurant.qrapp.exception.EntityNotFoundException;
import com.qrestaurant.qrapp.model.dto.MealDTO;
import com.qrestaurant.qrapp.model.entity.Meal;
import com.qrestaurant.qrapp.model.entity.MealCategory;
import com.qrestaurant.qrapp.model.entity.Menu;
import com.qrestaurant.qrapp.repository.MealCategoryRepository;
import com.qrestaurant.qrapp.repository.MealRepository;
import com.qrestaurant.qrapp.repository.MenuRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MealService {
    private final MealRepository mealRepository;
    private final MealCategoryRepository mealCategoryRepository;
    private final MenuRepository menuRepository;

    public MealService(MealRepository mealRepository, MealCategoryRepository mealCategoryRepository,
                       MenuRepository menuRepository) {
        this.mealRepository = mealRepository;
        this.mealCategoryRepository = mealCategoryRepository;
        this.menuRepository = menuRepository;
    }

    public Iterable<Meal> getMeals(Long restaurantId) {
        return mealRepository.getAllByMenu_Restaurant_Id(restaurantId);
    }

    public Iterable<Meal> getMealsByCategory(Long restaurantId, Long mealCategoryId) {
        return mealRepository.getAllByMenu_Restaurant_IdAndMealCategories_Id(restaurantId, mealCategoryId);
    }

    public Meal getMeal(Long id, Long restaurantId) throws EntityNotFoundException {
        return mealRepository
                .findByIdAndMenu_Restaurant_Id(id, restaurantId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Meal with id: " + id + " does not exists in restaurant with id: " + restaurantId + "."));
    }

    @KafkaListener(topics = "dashboard-meal", groupId = "qrestaurant",
            containerFactory = "mealConcurrentKafkaListenerContainerFactory")
    public void mealListener(MealDTO mealDTO) {
        Meal meal = new Meal(mealDTO.id(), mealDTO.name(), mealDTO.description(), mealDTO.price(), mealDTO.image());

        Optional<Menu> optionalMenu = menuRepository.findById(mealDTO.menuId());

        if (optionalMenu.isPresent()) {
            meal.setMenu(optionalMenu.get());

            List<MealCategory> mealCategories = new ArrayList<>();

            mealDTO.mealCategoryIds().forEach(id -> {
                Optional<MealCategory> optionalMealCategory =
                        mealCategoryRepository.findById(id);

                optionalMealCategory.ifPresent(mealCategories::add);
            });

            meal.setMealCategories(mealCategories);

            mealRepository.save(meal);
        }
    }

    @KafkaListener(topics = "dashboard-meal-delete", groupId = "qrestaurant",
            containerFactory = "deleteKafkaListenerContainerFactory")
    public void mealDeleteListener(Long id) {
        mealRepository.deleteById(id);
    }
}

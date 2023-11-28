package com.qrestaurant.qrapp.service;

import com.qrestaurant.qrapp.exception.EntityNotFoundException;
import com.qrestaurant.qrapp.model.entity.Meal;
import com.qrestaurant.qrapp.repository.MealRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class MealService {
    private final MealRepository mealRepository;

    public MealService(MealRepository mealRepository) {
        this.mealRepository = mealRepository;
    }

    public Iterable<Meal> getMeals(Long restaurantId) {
        return mealRepository.getAllByMenu_Restaurant_Id(restaurantId);
    }

    public Meal getMeal(Long id, Long restaurantId) throws EntityNotFoundException {
        return mealRepository
                .findByIdAndMenu_Restaurant_Id(id, restaurantId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Meal with id: " + id + " does not exists in restaurant with id: " + restaurantId + "."));
    }

    @KafkaListener(topics = "dashboard-meal", groupId = "qrestaurant",
            containerFactory = "mealConcurrentKafkaListenerContainerFactory")
    public void mealListener(Meal meal) {
        mealRepository.save(meal);
    }
}

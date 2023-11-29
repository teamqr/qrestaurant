package com.qrestaurant.qrapp.service;

import com.qrestaurant.qrapp.exception.EntityNotFoundException;
import com.qrestaurant.qrapp.model.dto.MealDTO;
import com.qrestaurant.qrapp.model.entity.Meal;
import com.qrestaurant.qrapp.model.entity.Menu;
import com.qrestaurant.qrapp.repository.MealRepository;
import com.qrestaurant.qrapp.repository.MenuRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MealService {
    private final MealRepository mealRepository;
    private final MenuRepository menuRepository;

    public MealService(MealRepository mealRepository, MenuRepository menuRepository) {
        this.mealRepository = mealRepository;
        this.menuRepository = menuRepository;
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
    public void mealListener(MealDTO mealDTO) {
        Meal meal = new Meal(mealDTO.id(), mealDTO.name(), mealDTO.description(), mealDTO.price());

        Optional<Menu> optionalMenu = menuRepository.findById(mealDTO.menuId());

        if (optionalMenu.isPresent()) {
            meal.setMenu(optionalMenu.get());

            mealRepository.save(meal);
        }
    }
}

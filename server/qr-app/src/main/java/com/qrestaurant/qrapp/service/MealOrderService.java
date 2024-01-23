package com.qrestaurant.qrapp.service;

import com.qrestaurant.qrapp.exception.EntityNotFoundException;
import com.qrestaurant.qrapp.model.entity.MealOrder;
import com.qrestaurant.qrapp.repository.MealOrderRepository;
import org.springframework.stereotype.Service;

@Service
public class MealOrderService {
    private final MealOrderRepository mealOrderRepository;

    public MealOrderService(MealOrderRepository mealOrderRepository) {
        this.mealOrderRepository = mealOrderRepository;
    }

    public MealOrder getMealOrder(Long id) throws EntityNotFoundException {
        return mealOrderRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("MealOrder with id: " + id + " does not exists."));
    }
}

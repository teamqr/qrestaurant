package com.qrestaurant.qrdashboard.repository;

import com.qrestaurant.qrdashboard.model.entity.Meal;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MealRepository extends CrudRepository<Meal, Long> {
    Iterable<Meal> getAllByMenu_Restaurant_Id(Long restaurantId);
    Optional<Meal> findByIdAndMenu_Restaurant_Id(Long id, Long restaurantId);
}
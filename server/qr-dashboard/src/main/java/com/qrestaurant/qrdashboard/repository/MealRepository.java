package com.qrestaurant.qrdashboard.repository;

import com.qrestaurant.qrdashboard.model.entity.Meal;
import jakarta.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Transactional
public interface MealRepository extends CrudRepository<Meal, Long> {
    Iterable<Meal> getAllByMenu_Restaurant_IdOrderByIdDesc(Long restaurantId);
    Iterable<Meal> getAllByMenu_Restaurant_IdAndMealCategories_Id(Long restaurantId, Long mealCategoryId);
    Optional<Meal> findByIdAndMenu_Restaurant_Id(Long id, Long restaurantId);
}

package com.qrestaurant.qrapp.repository;

import com.qrestaurant.qrapp.model.entity.MealCategory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MealCategoryRepository extends CrudRepository<MealCategory, Long> {
    Iterable<MealCategory> getAllByRestaurant_Id(Long restaurantId);
    Optional<MealCategory> findByIdAndRestaurant_Id(Long id, Long restaurantId);
}

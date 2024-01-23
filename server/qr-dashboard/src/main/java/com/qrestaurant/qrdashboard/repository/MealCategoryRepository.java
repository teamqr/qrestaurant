package com.qrestaurant.qrdashboard.repository;

import com.qrestaurant.qrdashboard.model.entity.MealCategory;
import jakarta.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Transactional
public interface MealCategoryRepository extends CrudRepository<MealCategory, Long> {
    Iterable<MealCategory> getAllByRestaurant_Id(Long restaurantId);
    Optional<MealCategory> findByIdAndRestaurant_Id(Long id, Long restaurantId);
    Optional<MealCategory> findByNameAndRestaurant_Id(String name, Long restaurantId);
}

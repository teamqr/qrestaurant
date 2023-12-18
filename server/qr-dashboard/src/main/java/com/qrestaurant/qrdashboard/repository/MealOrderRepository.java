package com.qrestaurant.qrdashboard.repository;

import com.qrestaurant.qrdashboard.model.entity.MealOrder;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealOrderRepository extends CrudRepository<MealOrder, Long> {}

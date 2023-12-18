package com.qrestaurant.qrapp.repository;

import com.qrestaurant.qrapp.model.entity.MealOrder;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealOrderRepository extends CrudRepository<MealOrder, Long> {}

package com.qrestaurant.qrapp.repository;

import com.qrestaurant.qrapp.model.entity.MealOrder;
import jakarta.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface MealOrderRepository extends CrudRepository<MealOrder, Long> {}

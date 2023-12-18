package com.qrestaurant.qrdashboard.repository;

import com.qrestaurant.qrdashboard.model.entity.MealOrder;
import jakarta.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface MealOrderRepository extends CrudRepository<MealOrder, Long> {
    Iterable<MealOrder> getAllByOrder_IdAndOrder_Restaurant_Id(Long orderId, Long restaurantId);
}

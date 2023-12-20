package com.qrestaurant.qrdashboard.repository;

import com.qrestaurant.qrdashboard.model.entity.Order;
import jakarta.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Transactional
public interface OrderRepository extends CrudRepository<Order, Long> {
    Iterable<Order> getAllByRestaurant_Id(Long restaurantId);
    Optional<Order> findByIdAndRestaurant_Id(Long id, Long restaurantId);
}

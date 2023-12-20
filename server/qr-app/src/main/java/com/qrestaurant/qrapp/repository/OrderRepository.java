package com.qrestaurant.qrapp.repository;

import com.qrestaurant.qrapp.model.entity.Order;
import jakarta.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Transactional
public interface OrderRepository extends CrudRepository<Order, Long> {
    Iterable<Order> getAllByUser_Id(Long userId);
    Optional<Order> findByIdAndUser_Id(Long id, Long userId);
}

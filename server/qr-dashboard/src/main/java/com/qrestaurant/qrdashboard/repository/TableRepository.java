package com.qrestaurant.qrdashboard.repository;

import com.qrestaurant.qrdashboard.model.entity.Table;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TableRepository extends CrudRepository<Table, Long> {
    Iterable<Table> getAllByRestaurant_Id(Long restaurantId);
    Optional<Table> findByIdAndRestaurant_Id(Long id, Long restaurantId);
    Optional<Table> findByNumberAndRestaurant_Id(Integer number, Long restaurantId);
    Optional<Table> findByPrefixAndRestaurant_Id(String prefix, Long restaurantId);
}

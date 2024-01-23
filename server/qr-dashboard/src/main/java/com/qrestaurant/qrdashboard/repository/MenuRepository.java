package com.qrestaurant.qrdashboard.repository;

import com.qrestaurant.qrdashboard.model.entity.Menu;
import jakarta.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Transactional
public interface MenuRepository extends CrudRepository<Menu, Long> {
    Optional<Menu> findMenuByRestaurant_Id(Long restaurantId);
}

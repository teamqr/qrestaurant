package com.qrestaurant.qrdashboard.repository;

import com.qrestaurant.qrdashboard.model.entity.Restaurant;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestaurantRepository extends CrudRepository<Restaurant, Long> {}

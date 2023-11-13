package com.qrestaurant.qrapp.repository;

import com.qrestaurant.qrapp.model.Restaurant;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestaurantRepository extends CrudRepository<Restaurant, Long> {}

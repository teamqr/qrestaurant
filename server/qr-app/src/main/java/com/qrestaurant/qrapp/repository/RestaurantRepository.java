package com.qrestaurant.qrapp.repository;

import com.qrestaurant.qrapp.model.entity.Restaurant;
import jakarta.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface RestaurantRepository extends CrudRepository<Restaurant, Long> {}

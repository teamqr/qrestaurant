package com.qrestaurant.qrapp.repository;

import com.qrestaurant.qrapp.model.entity.Menu;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuRepository extends CrudRepository<Menu, Long> {}

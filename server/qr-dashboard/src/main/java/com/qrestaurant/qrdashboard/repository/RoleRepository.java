package com.qrestaurant.qrdashboard.repository;

import com.qrestaurant.qrdashboard.model.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends CrudRepository<Role, Long> {}

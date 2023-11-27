package com.qrestaurant.qrdashboard.repository;

import com.qrestaurant.qrdashboard.common.Role;
import com.qrestaurant.qrdashboard.model.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    Iterable<User> getAllByRoleAndRestaurant_Id(Role role, Long restaurantId);
    Optional<User> findByEmail(String email);
    Optional<User> findByIdAndRoleAndRestaurant_Id(Long id, Role role, Long restaurantId);
}

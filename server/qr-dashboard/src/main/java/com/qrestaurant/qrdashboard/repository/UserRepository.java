package com.qrestaurant.qrdashboard.repository;

import com.qrestaurant.qrdashboard.common.Role;
import com.qrestaurant.qrdashboard.model.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    Iterable<User> findAllByRole(Role role);
    Optional<User> findByEmail(String email);
}

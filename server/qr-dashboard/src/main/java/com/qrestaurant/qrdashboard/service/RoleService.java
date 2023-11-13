package com.qrestaurant.qrdashboard.service;

import com.qrestaurant.qrdashboard.exception.EntityNotFoundException;
import com.qrestaurant.qrdashboard.model.Role;
import com.qrestaurant.qrdashboard.repository.RoleRepository;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Iterable<Role> getRoles() {
        return roleRepository.findAll();
    }

    public Role getRole(Long id) throws EntityNotFoundException {
        return roleRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Role with id: " + id + " does not exist."));
    }
}

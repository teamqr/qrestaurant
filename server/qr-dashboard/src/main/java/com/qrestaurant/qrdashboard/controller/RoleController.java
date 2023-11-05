package com.qrestaurant.qrdashboard.controller;

import com.qrestaurant.qrdashboard.model.Role;
import com.qrestaurant.qrdashboard.service.RoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard/role")
@PreAuthorize(value = "hasAuthority('SCOPE_ADMIN')")
public class RoleController {
    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Iterable<Role>>> getRoles() {
        Iterable<Role> roles = roleService.getRoles();

        Map<String, Iterable<Role>> response = new HashMap<>();
        response.put("roles", roles);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Role>> getRole(@PathVariable Long id) {
        Role role = roleService.getRole(id);

        Map<String, Role> response = new HashMap<>();
        response.put("role", role);

        return ResponseEntity.ok(response);
    }
}

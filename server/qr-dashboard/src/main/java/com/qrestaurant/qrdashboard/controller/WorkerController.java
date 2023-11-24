package com.qrestaurant.qrdashboard.controller;

import com.qrestaurant.qrdashboard.common.Role;
import com.qrestaurant.qrdashboard.model.NewUserRequest;
import com.qrestaurant.qrdashboard.model.entity.User;
import com.qrestaurant.qrdashboard.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard/worker")
@PreAuthorize(value = "hasAuthority('SCOPE_ADMIN')")
public class WorkerController {
    private final UserService userService;

    public WorkerController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Iterable<User>>> getWorkers() {
        Iterable<User> workers = userService.getWorkers();

        Map<String, Iterable<User>> response = new HashMap<>();
        response.put("workers", workers);

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Map<String, User>> createWorker(@Valid @RequestBody NewUserRequest newUserRequest) {
        User worker = userService.saveUser(newUserRequest, Role.WORKER);

        Map<String, User> response = new HashMap<>();
        response.put("worker", worker);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, User>> deleteWorker(@PathVariable Long id) {
        User worker = userService.deleteWorker(id);

        Map<String, User> response = new HashMap<>();
        response.put("worker", worker);

        return ResponseEntity.ok(response);
    }
}

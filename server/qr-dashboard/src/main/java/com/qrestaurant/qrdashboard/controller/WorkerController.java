package com.qrestaurant.qrdashboard.controller;

import com.qrestaurant.qrdashboard.common.MapperDTO;
import com.qrestaurant.qrdashboard.common.Role;
import com.qrestaurant.qrdashboard.model.dto.UserDTO;
import com.qrestaurant.qrdashboard.model.request.NewUserRequest;
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
    private final MapperDTO mapperDTO;

    public WorkerController(UserService userService, MapperDTO mapperDTO) {
        this.userService = userService;
        this.mapperDTO = mapperDTO;
    }

    @GetMapping
    public ResponseEntity<Map<String, Iterable<UserDTO>>> getWorkers(
            @RequestHeader("Authorization") String authorizationHeader) {
        Iterable<User> workers = userService.getWorkers(authorizationHeader);

        Map<String, Iterable<UserDTO>> response = new HashMap<>();
        response.put("workers", mapperDTO.toUserDTOs(workers));

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Map<String, UserDTO>> createWorker(@RequestHeader("Authorization") String authorizationHeader,
                                                             @Valid @RequestBody NewUserRequest newUserRequest) {
        User worker = userService.saveUser(authorizationHeader, newUserRequest, Role.WORKER);

        Map<String, UserDTO> response = new HashMap<>();
        response.put("worker", mapperDTO.toUserDTO(worker));

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, UserDTO>> deleteWorker(
            @RequestHeader("Authorization") String authorizationHeader, @PathVariable Long id) {
        User worker = userService.deleteWorker(authorizationHeader, id);

        Map<String, UserDTO> response = new HashMap<>();
        response.put("worker", mapperDTO.toUserDTO(worker));

        return ResponseEntity.ok(response);
    }
}

package com.qrestaurant.qrdashboard.controller;

import com.qrestaurant.qrdashboard.model.entity.Menu;
import com.qrestaurant.qrdashboard.service.MenuService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard/menu")
public class MenuController {
    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Menu>> getMenu(@RequestHeader(value = "Authorization") String authorizationHeader) {
        Menu menu = menuService.getMenu(authorizationHeader);

        Map<String, Menu> response = new HashMap<>();
        response.put("menu", menu);

        return ResponseEntity.ok(response);
    }

    @PostMapping
    @PreAuthorize(value = "hasAuthority('SCOPE_ADMIN')")
    public ResponseEntity<Map<String, Menu>> createMenu(
            @RequestHeader(value = "Authorization") String authorizationHeader) {
        Menu menu = menuService.createMenu(authorizationHeader);

        Map<String, Menu> response = new HashMap<>();
        response.put("menu", menu);

        return ResponseEntity.ok(response);
    }
}

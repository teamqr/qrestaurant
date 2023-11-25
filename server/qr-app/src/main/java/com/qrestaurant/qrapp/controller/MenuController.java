package com.qrestaurant.qrapp.controller;

import com.qrestaurant.qrapp.model.entity.Menu;
import com.qrestaurant.qrapp.service.MenuService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/app/menu")
public class MenuController {
    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Menu>> getMenu(@PathVariable Long id) {
        Menu menu = menuService.getMenu(id);

        Map<String, Menu> response = new HashMap<>();
        response.put("menu", menu);

        return ResponseEntity.ok(response);
    }
}

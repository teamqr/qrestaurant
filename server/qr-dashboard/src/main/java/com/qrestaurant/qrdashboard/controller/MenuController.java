package com.qrestaurant.qrdashboard.controller;

import com.qrestaurant.qrdashboard.common.MapperDTO;
import com.qrestaurant.qrdashboard.model.dto.MenuDTO;
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
    private final MapperDTO mapperDTO;

    public MenuController(MenuService menuService, MapperDTO mapperDTO) {
        this.menuService = menuService;
        this.mapperDTO = mapperDTO;
    }

    @GetMapping
    public ResponseEntity<Map<String, MenuDTO>> getMenu(
            @RequestHeader(value = "Authorization") String authorizationHeader) {
        Menu menu = menuService.getMenu(authorizationHeader);

        Map<String, MenuDTO> response = new HashMap<>();
        response.put("menu", mapperDTO.toMenuDTO(menu));

        return ResponseEntity.ok(response);
    }

    @PostMapping
    @PreAuthorize(value = "hasAuthority('SCOPE_ADMIN')")
    public ResponseEntity<Map<String, MenuDTO>> createMenu(
            @RequestHeader(value = "Authorization") String authorizationHeader) {
        Menu menu = menuService.createMenu(authorizationHeader);

        Map<String, MenuDTO> response = new HashMap<>();
        response.put("menu", mapperDTO.toMenuDTO(menu));

        return ResponseEntity.ok(response);
    }
}

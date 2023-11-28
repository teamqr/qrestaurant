package com.qrestaurant.qrapp.controller;

import com.qrestaurant.qrapp.common.MapperDTO;
import com.qrestaurant.qrapp.model.dto.MenuDTO;
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
    private final MapperDTO mapperDTO;

    public MenuController(MenuService menuService, MapperDTO mapperDTO) {
        this.menuService = menuService;
        this.mapperDTO = mapperDTO;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, MenuDTO>> getMenu(@PathVariable Long id) {
        Menu menu = menuService.getMenu(id);

        Map<String, MenuDTO> response = new HashMap<>();
        response.put("menu", mapperDTO.toMenuDTO(menu));

        return ResponseEntity.ok(response);
    }
}

package com.qrestaurant.qrapp.controller;

import com.qrestaurant.qrapp.common.MapperDTO;
import com.qrestaurant.qrapp.model.dto.TableDTO;
import com.qrestaurant.qrapp.model.entity.Table;
import com.qrestaurant.qrapp.service.TableService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/app/table")
public class TableController {
    private final TableService tableService;
    private final MapperDTO mapperDTO;

    public TableController(TableService tableService, MapperDTO mapperDTO) {
        this.tableService = tableService;
        this.mapperDTO = mapperDTO;
    }

    @GetMapping("/{code}")
    public ResponseEntity<Map<String, TableDTO>> getTable(@PathVariable String code) {
        Table table = tableService.getTable(code);

        Map<String, TableDTO> response = new HashMap<>();
        response.put("table", mapperDTO.toTableDTO(table));

        return ResponseEntity.ok(response);
    }
}

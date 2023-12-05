package com.qrestaurant.qrdashboard.controller;

import com.qrestaurant.qrdashboard.common.MapperDTO;
import com.qrestaurant.qrdashboard.model.dto.TableDTO;
import com.qrestaurant.qrdashboard.model.entity.Table;
import com.qrestaurant.qrdashboard.model.request.NewTableRequest;
import com.qrestaurant.qrdashboard.service.TableService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard/table")
public class TableController {
    private final TableService tableService;
    private final MapperDTO mapperDTO;

    public TableController(TableService tableService, MapperDTO mapperDTO) {
        this.tableService = tableService;
        this.mapperDTO = mapperDTO;
    }

    @GetMapping
    public ResponseEntity<Map<String, Iterable<TableDTO>>> getTables(
            @RequestHeader("Authorization") String authorizationHeader) {
        Iterable<Table> tables = tableService.getTables(authorizationHeader);

        Map<String, Iterable<TableDTO>> response = new HashMap<>();
        response.put("tables", mapperDTO.toTableDTOs(tables));

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, TableDTO>> getTable(@RequestHeader("Authorization") String authorizationHeader,
                                                          @PathVariable Long id) {
        Table table = tableService.getTable(authorizationHeader, id);

        Map<String, TableDTO> response = new HashMap<>();
        response.put("table", mapperDTO.toTableDTO(table));

        return ResponseEntity.ok(response);
    }

    @PostMapping
    @PreAuthorize(value = "hasAuthority('SCOPE_ADMIN')")
    public ResponseEntity<Map<String, TableDTO>> createTable(@RequestHeader("Authorization") String authorizationHeader,
                                                @Valid @RequestBody NewTableRequest newTableRequest) {
        Table table = tableService.createTable(authorizationHeader, newTableRequest);

        Map<String, TableDTO> response = new HashMap<>();
        response.put("table", mapperDTO.toTableDTO(table));

        return ResponseEntity.ok(response);
    }
}

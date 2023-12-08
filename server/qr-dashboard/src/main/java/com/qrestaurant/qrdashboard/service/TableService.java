package com.qrestaurant.qrdashboard.service;

import com.qrestaurant.qrdashboard.common.Generator;
import com.qrestaurant.qrdashboard.common.JWTUtil;
import com.qrestaurant.qrdashboard.common.MapperDTO;
import com.qrestaurant.qrdashboard.exception.EntityAlreadyExistsException;
import com.qrestaurant.qrdashboard.exception.EntityNotFoundException;
import com.qrestaurant.qrdashboard.model.dto.TableDTO;
import com.qrestaurant.qrdashboard.model.entity.Restaurant;
import com.qrestaurant.qrdashboard.model.entity.Table;
import com.qrestaurant.qrdashboard.model.request.NewTableRequest;
import com.qrestaurant.qrdashboard.model.request.UpdateTableRequest;
import com.qrestaurant.qrdashboard.repository.RestaurantRepository;
import com.qrestaurant.qrdashboard.repository.TableRepository;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TableService {
    private final TableRepository tableRepository;
    private final RestaurantRepository restaurantRepository;
    private final KafkaTemplate<String, TableDTO> tableKafkaTemplate;
    private final KafkaTemplate<String, Long> deleteKafkaTemplate;
    private final JWTUtil jwtUtil;
    private final MapperDTO mapperDTO;
    private final Generator generator;

    public TableService(TableRepository tableRepository, RestaurantRepository restaurantRepository,
                        KafkaTemplate<String, TableDTO> tableKafkaTemplate,
                        KafkaTemplate<String, Long> deleteKafkaTemplate, JWTUtil jwtUtil, MapperDTO mapperDTO,
                        Generator generator) {
        this.tableRepository = tableRepository;
        this.restaurantRepository = restaurantRepository;
        this.tableKafkaTemplate = tableKafkaTemplate;
        this.deleteKafkaTemplate = deleteKafkaTemplate;
        this.jwtUtil = jwtUtil;
        this.mapperDTO = mapperDTO;
        this.generator = generator;
    }

    public Iterable<Table> getTables(String authorizationHeader) {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        return tableRepository.getAllByRestaurant_Id(restaurantId);
    }

    public Table getTable(String authorizationHeader, Long id) throws EntityNotFoundException {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        Optional<Table> optionalTable = tableRepository.findByIdAndRestaurant_Id(id, restaurantId);

        if (optionalTable.isPresent()) {
            return optionalTable.get();
        } else {
            throw new EntityNotFoundException(
                    "Table with id: " + id + " does not exists in restaurant with id: " + restaurantId + '.');
        }
    }

    public Table createTable(String authorizationHeader, NewTableRequest newTableRequest)
            throws RuntimeException {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        if (tableRepository.findByNumberAndRestaurant_Id(newTableRequest.number(), restaurantId).isPresent()) {
            throw new EntityAlreadyExistsException(
                    "Table with number: " + newTableRequest.number() + " already exists in restaurant with id: "
                            + restaurantId + '.');
        }

        if (tableRepository.findByPrefixAndRestaurant_Id(newTableRequest.prefix(), restaurantId).isPresent()) {
            throw new EntityAlreadyExistsException(
                    "Table with prefix: " + newTableRequest.prefix() + " already exists in restaurant with id: "
                            + restaurantId + '.');
        }

        Optional<Restaurant> optionalRestaurant = restaurantRepository.findById(restaurantId);

        if (optionalRestaurant.isPresent()) {
            Restaurant restaurant = optionalRestaurant.get();

            String code = restaurant.getPrefix() + newTableRequest.prefix() + generator.generateAlphaNumericalString(2);

            Table table = new Table(newTableRequest.number(), newTableRequest.prefix(), code);
            table.setRestaurant(restaurant);

            table = tableRepository.save(table);

            tableKafkaTemplate.send("dashboard-table", mapperDTO.toTableDTO(table));

            return table;
        } else {
            throw new EntityNotFoundException("Restaurant with id: " + restaurantId + " does not exists.");
        }
    }

    public Table updateTable(String authorizationHeader, UpdateTableRequest updateTableRequest)
            throws RuntimeException {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        if (tableRepository.findByNumberAndRestaurant_Id(updateTableRequest.number(), restaurantId).isPresent()) {
            throw new EntityAlreadyExistsException(
                    "Table with number: " + updateTableRequest.number() + " already exists in restaurant with id: "
                            + restaurantId + '.');
        }

        Optional<Table> optionalTable = tableRepository.findByIdAndRestaurant_Id(updateTableRequest.id(), restaurantId);

        if (optionalTable.isPresent()) {
            Table table = optionalTable.get();
            table.setNumber(updateTableRequest.number());

            table = tableRepository.save(table);

            tableKafkaTemplate.send("dashboard-table", mapperDTO.toTableDTO(table));

            return table;
        } else {
            throw new EntityNotFoundException(
                    "Table with id: " + updateTableRequest.id() + " does not exists in restaurant with id: "
                            + restaurantId + '.');
        }
    }

    public Table deleteTable(String authorizationHeader, Long id) throws EntityNotFoundException {
        Jwt jwtToken = jwtUtil.getJWTToken(authorizationHeader);
        Long restaurantId = jwtToken.getClaim("restaurantId");

        Optional<Table> optionalTable = tableRepository.findByIdAndRestaurant_Id(id, restaurantId);

        if (optionalTable.isPresent()) {
            tableRepository.delete(optionalTable.get());

            deleteKafkaTemplate.send("dashboard-table-delete", id);

            return optionalTable.get();
        } else {
            throw new EntityNotFoundException(
                    "Table with id: " + id + " does not exists in restaurant with id: " + restaurantId + '.');
        }
    }
}

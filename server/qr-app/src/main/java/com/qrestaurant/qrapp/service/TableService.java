package com.qrestaurant.qrapp.service;

import com.qrestaurant.qrapp.exception.EntityNotFoundException;
import com.qrestaurant.qrapp.model.dto.TableDTO;
import com.qrestaurant.qrapp.model.entity.Restaurant;
import com.qrestaurant.qrapp.model.entity.Table;
import com.qrestaurant.qrapp.repository.RestaurantRepository;
import com.qrestaurant.qrapp.repository.TableRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TableService {
    private final TableRepository tableRepository;
    private final RestaurantRepository restaurantRepository;

    public TableService(TableRepository tableRepository, RestaurantRepository restaurantRepository) {
        this.tableRepository = tableRepository;
        this.restaurantRepository = restaurantRepository;
    }

    public Table getTable(String code) throws EntityNotFoundException {
        Optional<Table> optionalTable = tableRepository.findByCode(code);

        if (optionalTable.isPresent()) {
            return optionalTable.get();
        } else {
            throw new EntityNotFoundException("Table with code: " + code + " does not exists.");
        }
    }

    @KafkaListener(topics = "dashboard-table", groupId = "qrestaurant",
            containerFactory = "tableConcurrentKafkaListenerContainerFactory")
    public void tableListener(TableDTO tableDTO) {
        Table table = new Table(tableDTO.id(), tableDTO.number(), tableDTO.prefix(), tableDTO.code());

        Optional<Restaurant> optionalRestaurant = restaurantRepository.findById(tableDTO.restaurantId());

        if (optionalRestaurant.isPresent()) {
            table.setRestaurant(optionalRestaurant.get());

            tableRepository.save(table);
        }
    }

    @KafkaListener(topics = "dashboard-table-delete", groupId = "qrestaurant",
            containerFactory = "deleteKafkaListenerContainerFactory")
    public void tableDeleteListener(Long id) {
        tableRepository.deleteById(id);
    }
}

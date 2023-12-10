package com.qrestaurant.qrapp.repository;

import com.qrestaurant.qrapp.model.entity.Table;
import jakarta.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Transactional
public interface TableRepository extends CrudRepository<Table, Long> {
    Optional<Table> findByCode(String code);
}

package com.qrestaurant.qrapp.service;

import com.qrestaurant.qrapp.model.entity.Table;
import com.qrestaurant.qrapp.repository.RestaurantRepository;
import com.qrestaurant.qrapp.repository.TableRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class TableServiceTest {

    @Mock
    private TableRepository tableRepository;
    @Mock
    private RestaurantRepository restaurantRepository;

    private TableService subject;

    @BeforeEach
    void setUp() {
        this.subject = new TableService(tableRepository, restaurantRepository);
    }

    @Test
    void shouldGetTable() {
        //given
        final String code = "TB";
        BDDMockito.given(this.tableRepository.findByCode(code)).willReturn(Optional.of(new Table()));
        //when
        this.subject.getTable(code);
        //then
        Mockito.verify(this.tableRepository).findByCode(code);
    }
}
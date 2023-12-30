package com.qrestaurant.qrapp.service;

import com.qrestaurant.qrapp.model.entity.Menu;
import com.qrestaurant.qrapp.repository.MenuRepository;
import com.qrestaurant.qrapp.repository.RestaurantRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class MenuServiceTest {
    @Mock
    private MenuRepository menuRepository;
    @Mock
    private RestaurantRepository restaurantRepository;

    private MenuService subject;

    @BeforeEach
    void setUp() {
        this.subject = new MenuService(menuRepository, restaurantRepository);
    }

    @Test
    void getMenu() {
        //given
        final Long id = 9L;
        BDDMockito.given(this.menuRepository.findById(id)).willReturn(Optional.of(new Menu()));
        //when
        this.subject.getMenu(id);
        //then
        Mockito.verify(this.menuRepository)
                .findById(id);
    }
}
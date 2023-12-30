package com.qrestaurant.qrapp.service;

import com.qrestaurant.qrapp.model.entity.Restaurant;
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
class RestaurantServiceTest {
    @Mock
    private RestaurantRepository restaurantRepository;

    private RestaurantService subject;

    @BeforeEach
    void setUp() {
        this.subject = new RestaurantService(restaurantRepository);
    }


    @Test
    void shouldGetRestaurants() {
        //when
        this.subject.getRestaurants();
        //then
        Mockito.verify(this.restaurantRepository)
                .findAll();
    }

    @Test
    void shouldGetFeaturedRestaurants() {
        //when
        this.subject.getFeaturedRestaurants();
        //then
        Mockito.verify(this.restaurantRepository)
                .findAllByFeatured(true);
    }

    @Test
    void shouldGetRestaurant() {
        //given
        final Long id = 1L;
        BDDMockito.given(this.restaurantRepository.findById(id)).willReturn(Optional.of(new Restaurant()));
        //when
        this.subject.getRestaurant(id);
        //then
        Mockito.verify(this.restaurantRepository)
                .findById(id);
    }
}
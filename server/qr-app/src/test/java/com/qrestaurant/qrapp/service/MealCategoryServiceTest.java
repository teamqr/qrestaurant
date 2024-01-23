package com.qrestaurant.qrapp.service;

import com.qrestaurant.qrapp.model.entity.MealCategory;
import com.qrestaurant.qrapp.repository.MealCategoryRepository;
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
class MealCategoryServiceTest {

    @Mock
    private MealCategoryRepository mealCategoryRepository;

    @Mock
    private RestaurantRepository restaurantRepository;


    private MealCategoryService subject;

    @BeforeEach
    void setUp() {
        this.subject = new MealCategoryService(mealCategoryRepository, restaurantRepository);

    }

    @Test
    void shouldGetMealCategories() {
        //given
        final Long restaurantId = 12L;
        //when
        this.subject.getMealCategories(restaurantId);
        //then
        Mockito.verify(this.mealCategoryRepository)
                .getAllByRestaurant_Id(restaurantId);

    }

    @Test
    void shouldGetMealCategory() {
        //given
        final Long id = 6L;
        final Long restaurantId = 2L;
        BDDMockito.given(this.mealCategoryRepository
                        .findByIdAndRestaurant_Id(id, restaurantId))
                .willReturn(Optional.of(new MealCategory()));
        //when
        this.subject.getMealCategory(id, restaurantId);
        //then
        Mockito.verify(this.mealCategoryRepository).findByIdAndRestaurant_Id(id, restaurantId);
    }

}
package com.qrestaurant.qrapp.service;

import com.qrestaurant.qrapp.model.entity.Meal;
import com.qrestaurant.qrapp.repository.MealCategoryRepository;
import com.qrestaurant.qrapp.repository.MealRepository;
import com.qrestaurant.qrapp.repository.MenuRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class MealServiceTest {
    @Mock
    private MealRepository mealRepository;
    @Mock
    private MealCategoryRepository mealCategoryRepository;
    @Mock
    private MenuRepository menuRepository;

    private MealService subject;

    @BeforeEach
    void setUp() {
        this.subject = new MealService(mealRepository, mealCategoryRepository, menuRepository);

    }

    @Test
    void shouldGetMeals() {
        //given
        final Long restaurantId = 14L;
        //when
        this.subject.getMeals(restaurantId);
        //then
        Mockito.verify(this.mealRepository)
                .getAllByMenu_Restaurant_Id(restaurantId);
    }

    @Test
    void shouldGetMealsByCategory() {
        //given
        final Long restaurantId = 3L;
        final Long mealCategoryId = 16L;
        //when
        this.subject.getMealsByCategory(restaurantId, mealCategoryId);
        //then
        Mockito.verify(this.mealRepository)
                .getAllByMenu_Restaurant_IdAndMealCategories_Id(restaurantId, mealCategoryId);
    }

    @Test
    void shouldGetMeal() {
        //given
        final Long id = 10L;
        final Long restaurantId = 13L;
        BDDMockito.given(this.mealRepository
                        .findByIdAndMenu_Restaurant_Id(id, restaurantId))
                .willReturn(Optional.of(new Meal()));
        //when
        this.subject.getMeal(id, restaurantId);
        //then
        Mockito.verify(this.mealRepository)
                .findByIdAndMenu_Restaurant_Id(id, restaurantId);
    }
}
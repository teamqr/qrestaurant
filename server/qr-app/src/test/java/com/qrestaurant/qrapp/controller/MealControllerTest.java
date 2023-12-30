package com.qrestaurant.qrapp.controller;

import com.qrestaurant.qrapp.common.MapperDTO;
import com.qrestaurant.qrapp.configuration.PasswordConfiguration;
import com.qrestaurant.qrapp.configuration.SecurityConfiguration;
import com.qrestaurant.qrapp.model.entity.Meal;
import com.qrestaurant.qrapp.service.MealService;
import com.qrestaurant.qrapp.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest({MealController.class})
@Import({SecurityConfiguration.class})
class MealControllerTest {
    @MockBean
    private MealService mealService;
    @MockBean
    private UserService userService;
    @MockBean
    private JwtDecoder jwtDecoder;
    @MockBean
    private PasswordConfiguration passwordConfiguration;
    @MockBean
    private AuthenticationManager authenticationManager;
    @MockBean
    private MapperDTO mapperDTO;

    @Autowired
    private MockMvc mvc;

    @Test
    void shouldGetUnauthorized() throws Exception {
        //then
        this.mvc.perform(get("/api/app/meal")).andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser
    void shouldGetMeals() throws Exception {
        //given
        final Long restaurantId = 8L;
        final List<Meal> meals = List.of(new Meal());

        //when
        when(this.mealService.getMeals(restaurantId)).thenReturn(meals);

        //then
        this.mvc.perform(get("/api/app/meal?restaurantId={id}", restaurantId)).andExpect(status().isOk());

    }

    @Test
    @WithMockUser
    void shouldGetMealsByCategory() throws Exception {
        //given
        final Long restaurantId = 7L;
        final Long categoryId = 3L;

        final List<Meal> meals = List.of(new Meal());

        //when
        when(this.mealService.getMealsByCategory(restaurantId, categoryId)).thenReturn(meals);

        //then
        this.mvc.perform(get("/api/app/meal/category/{categoryId}?restaurantId={restaurantId}", categoryId, restaurantId)).andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    void shouldGetMealById() throws Exception {
        //given
        final Long mealId = 15L;
        final Long restaurantId = 6L;
        final Meal meal = new Meal();

        //when
        when(this.mealService.getMeal(mealId, restaurantId)).thenReturn(meal);

        //then
        this.mvc.perform(get("/api/app/meal/{mealId}?restaurantId={restaurantId}", mealId, restaurantId)).andExpect(status().isOk());

    }
}
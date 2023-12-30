package com.qrestaurant.qrapp.controller;

import com.qrestaurant.qrapp.common.MapperDTO;
import com.qrestaurant.qrapp.configuration.PasswordConfiguration;
import com.qrestaurant.qrapp.configuration.SecurityConfiguration;
import com.qrestaurant.qrapp.model.entity.MealCategory;
import com.qrestaurant.qrapp.service.MealCategoryService;
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

@WebMvcTest({MealCategoryController.class})
@Import({SecurityConfiguration.class})
class MealCategoryControllerTest {
    @MockBean
    private MealCategoryService mealCategoryService;
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
        this.mvc.perform(get("/api/app/meal-category?restaurantId=1")).andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser
    void shouldGetMealCategories() throws Exception {
        //given
        final Long restaurantId = 13L;
        final List<MealCategory> mealCategories = List.of(new MealCategory());

        //when
        when(this.mealCategoryService.getMealCategories(restaurantId)).thenReturn(mealCategories);

        //then
        this.mvc.perform(get("/api/app/meal-category?restaurantId={id}", restaurantId)).andExpect(status().isOk());

    }

    @Test
    @WithMockUser
    void shouldGetMealCategoryById() throws Exception {
        //given
        final Long mealCategoryId = 12L;
        final Long restaurantId = 21L;
        final MealCategory mealCategory = new MealCategory();

        //when
        when(this.mealCategoryService.getMealCategory(mealCategoryId, restaurantId)).thenReturn(mealCategory);

        //then
        this.mvc.perform(get("/api/app/meal-category/{mealCategoryId}?restaurantId={restaurantId}", mealCategoryId, restaurantId)).andExpect(status().isOk());
    }
}
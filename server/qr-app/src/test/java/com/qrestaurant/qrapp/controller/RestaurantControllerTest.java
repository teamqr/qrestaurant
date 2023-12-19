package com.qrestaurant.qrapp.controller;

import com.qrestaurant.qrapp.common.MapperDTO;
import com.qrestaurant.qrapp.configuration.PasswordConfiguration;
import com.qrestaurant.qrapp.configuration.SecurityConfiguration;
import com.qrestaurant.qrapp.model.entity.Restaurant;
import com.qrestaurant.qrapp.service.RestaurantService;
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

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest({RestaurantController.class})
@Import({SecurityConfiguration.class})
class RestaurantControllerTest {
    @MockBean
    private RestaurantService restaurantService;
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
        this.mvc.perform(get("/api/app/restaurant")).andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser
    void shouldGetRestaurants() throws Exception {
        //given
        final List<Restaurant> restaurants = List.of(new Restaurant());
        //when
        when(this.restaurantService.getRestaurants()).thenReturn(restaurants);

        //then
        this.mvc.perform(get("/api/app/restaurant")).andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    void shouldGetFeaturedRestaurants() throws Exception {
        //given
        final List<Restaurant> restaurants = List.of(new Restaurant());
        //when
        when(this.restaurantService.getFeaturedRestaurants()).thenReturn(restaurants);

        //then
        this.mvc.perform(get("/api/app/restaurant/featured")).andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    void shouldGetRestaurantById() throws Exception {
        //given
        final Restaurant restaurant =new Restaurant();
        //when
        when(this.restaurantService.getRestaurant(1L)).thenReturn(restaurant);

        //then
        this.mvc.perform(get("/api/app/restaurant/1")).andExpect(status().isOk());
    }
}
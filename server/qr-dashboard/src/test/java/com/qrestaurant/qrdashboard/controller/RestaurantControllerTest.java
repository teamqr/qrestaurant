package com.qrestaurant.qrdashboard.controller;

import com.qrestaurant.qrdashboard.common.MapperDTO;
import com.qrestaurant.qrdashboard.configuration.*;
import com.qrestaurant.qrdashboard.model.entity.Restaurant;
import com.qrestaurant.qrdashboard.model.request.UpdateRestaurantRequest;
import com.qrestaurant.qrdashboard.service.RestaurantService;
import com.qrestaurant.qrdashboard.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
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
    @MockBean
    private JWTFilterBefore jwtFilterBefore;

    @Autowired
    private MockMvc mvc;


    @Test
    void shouldGetRestaurant() throws Exception {
        //given
        final Restaurant restaurant = new Restaurant();
        final String authHeader = "Bearer token";
        //when
        when(this.restaurantService.getRestaurant(authHeader)).thenReturn(restaurant);

        //then
        this.mvc.perform(get("/api/dashboard/restaurant").header("Authorization","Bearer token")).andExpect(status().isOk());
    }

    @Test
    void shouldUpdateRestaurant() throws Exception {
        //given
        final UpdateRestaurantRequest req = new UpdateRestaurantRequest("Pierogarnia Testowa", "base64Img");
        final String authHeader = "Bearer token";
        final Restaurant restaurant= new Restaurant("Pierogarnia Testowa","PT", "base64Img");
        //when
        when(this.restaurantService.updateRestaurant(authHeader, req)).thenReturn(restaurant);
        //then
        this.mvc.perform(put("/api/dashboard/restaurant")).andExpect(status().isOk());
    }
}
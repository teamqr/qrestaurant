package com.qrestaurant.qrapp.controller;

import com.qrestaurant.qrapp.common.MapperDTO;
import com.qrestaurant.qrapp.configuration.PasswordConfiguration;
import com.qrestaurant.qrapp.configuration.SecurityConfiguration;
import com.qrestaurant.qrapp.model.entity.Menu;
import com.qrestaurant.qrapp.service.MenuService;
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

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest({MenuController.class})
@Import({SecurityConfiguration.class})
class MenuControllerTest {
    @MockBean
    private MenuService menuService;
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
        this.mvc.perform(get("/api/app/menu/1")).andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser
    void shouldGetMenu() throws Exception {
        //given
        final Long menuId = 4L;
        final Menu menu = new Menu();

        //when
        when(this.menuService.getMenu(menuId)).thenReturn(menu);

        //then
        this.mvc.perform(get("/api/app/menu/{menuId}", menuId)).andExpect(status().isOk());
    }
}